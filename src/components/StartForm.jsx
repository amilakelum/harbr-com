import { motion } from "motion/react";
import { useState, useEffect, forwardRef, useRef } from "react";
import { Check, Calendar, Anchor, ShieldCheck, Clock, MapPin, ArrowRight, ExternalLink } from "lucide-react";
import { supabase } from "../lib/supabase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import posthog from "posthog-js";
import { trackConversion, trackFormInteraction, trackCTAInteraction } from "../lib/analytics";

export default function StartForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    email: "",
    preferredMarinas: "",
    startDate: "",
    stayLength: "",
    interest: "book"
  });
  
  // Track form field focus time
  const fieldFocusTime = useRef(null);
  const activeField = useRef(null);
  
  // Step timer for funnel analysis
  const stepStartTime = useRef(Date.now());
  const formStartTime = useRef(Date.now());

  // Generate a unique session ID when the component mounts
  useEffect(() => {
    // Create a robust session ID that works across all browsers
    const generateSessionId = () => {
      try {
        return crypto.randomUUID();
      } catch (e) {
        // Fallback for browsers that don't support crypto.randomUUID
        return 'session-' + Date.now() + '-' + Math.random().toString(36).substring(2, 15);
      }
    };
    
    // Try to get an existing session ID from localStorage first
    const existingData = JSON.parse(localStorage.getItem('formData') || '{}');
    const existingSessionIds = Object.keys(existingData);
    
    if (existingSessionIds.length > 0) {
      // Use the most recent session ID if it exists
      console.log('Using existing session ID');
      setSessionId(existingSessionIds[existingSessionIds.length - 1]);
    } else {
      // Generate a new session ID
      const newSessionId = generateSessionId();
      console.log('Generated new session ID:', newSessionId);
      setSessionId(newSessionId);
    }

    // Track initial form view - this is the first step in the funnel
    posthog.capture('form_viewed', {
      distinct_id: sessionId || 'unknown',
      form_name: 'harbr_signup'
    });
    
    // Track initial form view with enhanced growth metrics
    trackFormInteraction('harbr_signup', 'viewed', {
      initial_step: 1,
      form_location: 'start-page',
      total_steps: 3,
      source: document.referrer || 'direct',
      landing_page: window.location.pathname
    });
    
    // Record form start time for conversion analysis
    formStartTime.current = Date.now();
    stepStartTime.current = Date.now();
    
    // Setup field focus/blur tracking
    const trackFieldTime = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
        const fieldName = e.target.name;
        const fieldType = e.target.type;
        
        if (e.type === 'focus') {
          activeField.current = fieldName;
          fieldFocusTime.current = Date.now();
        } else if (e.type === 'blur' && activeField.current === fieldName) {
          const timeSpent = Math.floor((Date.now() - fieldFocusTime.current) / 1000);
          if (timeSpent > 1) { // Only track meaningful interactions (> 1 second)
            trackFormInteraction('harbr_signup', 'field_interaction', {
              field_name: fieldName,
              field_type: fieldType,
              time_spent: timeSpent,
              step_number: step,
              has_value: !!e.target.value
            });
          }
          activeField.current = null;
        }
      }
    };
    
    document.addEventListener('focus', trackFieldTime, true);
    document.addEventListener('blur', trackFieldTime, true);
    
    return () => {
      document.removeEventListener('focus', trackFieldTime, true);
      document.removeEventListener('blur', trackFieldTime, true);
    };
  }, []);

  // Function to save form data to Supabase
  const saveFormData = async (isComplete = false) => {
    if (!sessionId) return false;
    
    setLoading(true);
    setFormError(null);
    
    try {
      console.log('Saving data for step:', step);
      console.log('Session ID:', sessionId);
      
      // Prepare the data for Supabase
      const dataToSave = {
        session_id: sessionId,
        email: formData.email || '',
        interest: formData.interest || '',
        name: formData.name || '',
        region: formData.region || '',
        preferred_marinas: formData.preferredMarinas || '',
        start_date: formData.startDate || null,
        stay_length: formData.stayLength || '',
        current_step: step,
        is_complete: isComplete,
        updated_at: new Date().toISOString()
      };
      
      // Attempt to save to localStorage as a backup
      try {
        const localStorageData = JSON.parse(localStorage.getItem('formData') || '{}');
        localStorage.setItem('formData', JSON.stringify({
          ...localStorageData,
          [sessionId]: {
            ...dataToSave,
            created_at: localStorageData[sessionId]?.created_at || new Date().toISOString()
          }
        }));
      } catch (localErr) {
        console.error('Error saving to localStorage:', localErr);
      }

      // Create a direct reference to the supabase table - simplified approach
      const supabaseTable = supabase.from('form_submissions');
      
      // Check if we already have an entry with this session ID
      const { data: existingData, error: selectError } = await supabaseTable
        .select('id')
        .eq('session_id', sessionId)
        .maybeSingle();
      
      console.log('Existing data check:', existingData, selectError);
      
      // If we get an error that's not related to the table not existing, log it
      if (selectError && !selectError.message?.includes('does not exist')) {
        console.error('Error checking for existing record:', selectError);
        // Continue with insert as fallback
      }
      
      let result;
      
      if (existingData?.id) {
        // Update existing record
        console.log('Updating existing record ID:', existingData.id);
        result = await supabaseTable
          .update(dataToSave)
          .eq('id', existingData.id);
      } else {
        // Insert new record
        console.log('Inserting new record with session ID:', sessionId);
        dataToSave.created_at = new Date().toISOString();
        result = await supabaseTable
          .insert(dataToSave);
      }

      if (result?.error) {
        console.error('Operation error:', result.error);
        
        // Track error in PostHog
        posthog.capture('form_error', {
          form_name: 'harbr_signup',
          step_number: step,
          error_type: 'supabase_error',
          error_message: result.error.message
        });
        
        throw result.error;
      }
      
      console.log('Successfully saved data for step', step, result);
      
      // Track successful save in PostHog with enhanced metrics
      trackFormInteraction('harbr_signup', 'step_saved', {
        step_number: step,
        total_steps: 3,
        is_complete: isComplete,
        time_spent_on_step: Math.floor((Date.now() - stepStartTime.current) / 1000),
        form_step_conversion_rate: ((step / 3) * 100).toFixed(1)
      });
      
      return true;
    } catch (error) {
      console.error('Error saving form data:', error);
      
      // Track error in PostHog with detailed context
      trackFormInteraction('harbr_signup', 'error', {
        step_number: step,
        error_type: 'save_error',
        error_message: error.message,
        form_data_complete: Object.values(formData).filter(Boolean).length,
        recovery_attempted: true
      });
      
      // Check if localStorage has the backup
      const localBackup = localStorage.getItem('formData');
      if (localBackup && JSON.parse(localBackup)[sessionId]) {
        console.log('Using localStorage backup to continue');
        return true; // Let form progress with localStorage backup
      }
      
      setFormError('There was an error saving your data. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Calculate time spent on current step before submission
    const timeSpentOnStep = Math.floor((Date.now() - stepStartTime.current) / 1000);
    
    // Basic validation before submission
    if (step === 1 && !formData.email) {
      setFormError('Please enter your email address.');
      
      // Track validation error in PostHog with enhanced context
      trackFormInteraction('harbr_signup', 'validation_error', {
        step_number: step,
        field: 'email',
        error_message: 'Email is required',
        time_spent_on_step: timeSpentOnStep
      });
      
      return;
    }
    
    if (step === 3 && (!formData.name || !formData.region)) {
      setFormError('Please fill in all required fields.');
      
      // Track validation error with improved context
      trackFormInteraction('harbr_signup', 'validation_error', {
        step_number: step,
        field: (!formData.name) ? 'name' : 'region',
        error_message: 'Required fields are missing',
        time_spent_on_step: timeSpentOnStep,
        fields_completed: Object.values(formData).filter(Boolean).length
      });
      
      return;
    }
    
    try {
      // Save the current form data to Supabase
      const isLastStep = step === 3;
      
      let saved = false;
      
      try {
        // Add detailed logging to help track the submission
        console.log('Form submission - Step:', step);
        console.log('Form data:', formData);
        console.log('Session ID:', sessionId);
        
        // Attempt to save data to Supabase
        saved = await saveFormData(isLastStep);
        
        // Log success and proceed
        if (saved) {
          console.log('Form data successfully saved to Supabase');
        } else {
          console.warn('Form data not saved to Supabase - using local backup');
        }
      } catch (saveError) {
        console.error('Save error:', saveError);
        
        // We can move to next step despite errors in some cases
        const localBackup = localStorage.getItem('formData');
        if (localBackup && JSON.parse(localBackup)[sessionId]) {
          console.log('Error, but using localStorage backup to continue');
          saved = true; // Allow form to proceed with localStorage backup
        }
      }
      
      if (!saved) {
        setFormError('Unable to save your data. Please check your connection and try again.');
        return; // Don't proceed if there was an error saving
      }
  
      // Progress to next step or complete the submission
      if (step < 3) {
        // Update the step value
        const nextStep = step + 1;
        
        // Track step change with the exact event name and properties from the funnel screenshot
        // This matches the step_number property seen in the PostHog dashboard (2.0, 3.0)
        posthog.capture('form_step_changed', {
          distinct_id: sessionId || 'unknown',
          step_number: nextStep === 2 ? 2.0 : 3.0,  // Match exactly what's in the PostHog dashboard
          form_name: 'harbr_signup'
        });
        
        // Track with enhanced analytics for growth insights
        trackFormInteraction('harbr_signup', 'next_step', {
          current_step: step,
          next_step: nextStep,
          time_spent_on_step: timeSpentOnStep,
          fields_completed_count: Object.values(formData).filter(Boolean).length,
          progression_rate: ((step / 3) * 100).toFixed(1)  // % of form completed
        });
        
        // Reset the step timer
        stepStartTime.current = Date.now();
        
        // Now update the UI to show the next step
        setStep(nextStep);
      } else {
        console.log('Form submission complete!');
        
        // Calculate total form completion time
        const totalFormTime = Math.floor((Date.now() - formStartTime.current) / 1000);
        
        // Track form completion - this is the final step in the funnel
        posthog.capture('form_completed', {
          distinct_id: sessionId || 'unknown',
          form_name: 'harbr_signup',
          user_type: formData.interest,
          has_start_date: !!formData.startDate,
          has_marina_preference: !!formData.preferredMarinas
        });
        
        // Track as a conversion event for growth analysis
        trackConversion('signup_completed', {
          conversion_type: 'form_submission',
          user_type: formData.interest,
          time_to_convert: totalFormTime,
          form_name: 'harbr_signup',
          referrer: document.referrer || 'direct',
          landing_page: window.location.pathname
        });
        
        // Send identify call to associate user with their email
        if (formData.email) {
          posthog.identify(formData.email, {
            email: formData.email,
            name: formData.name,
            region: formData.region,
            user_type: formData.interest,
            $set_once: { first_signup_date: new Date().toISOString() }
          });
        }
        
        setSubmitted(true);
      }
    } catch (error) {
      console.error('General form submission error:', error);
      setFormError('Something went wrong. Please try again later.');
      
      // Track error in PostHog with enhanced details
      trackFormInteraction('harbr_signup', 'error', {
        step_number: step,
        error_type: 'general_error',
        error_message: error.message,
        is_last_step: step === 3,
        time_on_step: timeSpentOnStep,
        browser: navigator.userAgent
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Track field interactions for key fields with enhanced details
    if (['email', 'interest', 'name', 'region'].includes(name)) {
      trackFormInteraction('harbr_signup', 'field_change', {
        field_name: name,
        field_type: e.target.type,
        step_number: step,
        has_value: !!value,
        value_length: value.length,
        is_valid: e.target.validity?.valid,
        is_required: e.target.required
      });
    }
  };

  // Handle CTA click events with enhanced tracking
  const handleCTAClick = (ctaType) => {
    trackCTAInteraction(
      `form_submit_step_${step}`, 
      step === 3 ? "Join Now — It's Free" : "Continue", 
      {
        step_number: step,
        location: 'signup_form',
        position: 'bottom',
        form_completion: ((step / 3) * 100).toFixed(0) + '%',
        time_on_step: Math.floor((Date.now() - stepStartTime.current) / 1000)
      }
    );
  };

  // Custom input component for DatePicker
  const CustomDatePickerInput = forwardRef(({ value, onClick, placeholder }, ref) => (
    <div className="relative w-full">
      <input
        ref={ref}
        className="block w-full rounded-xl border-2 border-zinc-200 px-4 py-3.5 text-zinc-600 shadow-sm placeholder:text-zinc-400 focus:border-[#5371FF] focus:ring-2 focus:ring-[#5371FF]/20 focus:outline-none transition-all duration-200 text-base sm:text-sm"
        value={value}
        onClick={onClick}
        placeholder={placeholder}
        readOnly
        style={{ width: '100%', boxSizing: 'border-box' }}
      />
      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
    </div>
  ));
  
  CustomDatePickerInput.displayName = "CustomDatePickerInput";

  if (submitted) {
    return (
      <div className="relative isolate px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-6 sm:p-12 shadow-xl ring-1 ring-zinc-900/10 text-center relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-[#5371FF] to-purple-500"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#EEF1FF] opacity-40 blur-xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-[#EEF1FF] opacity-40 blur-xl"></div>
            
            <div className="relative">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 mb-6 sm:mb-8"
              >
                <Check className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
              </motion.div>
              
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-3 sm:mb-4"
              >
                Thank you for registering!
              </motion.h2>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-base sm:text-lg text-zinc-600 mb-3"
              >
                We're excited to have you join the marina revolution. Stay tuned for updates!
              </motion.p>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-4 sm:mb-8 mt-6 sm:mt-8"
              >
                <p className="text-base sm:text-lg text-zinc-700 font-medium">
                  Based in Australia or New Zealand?
                </p>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base text-zinc-600">
                  Check out our regional platform:
                </p>
                <a 
                  href="https://www.harbourhound.com.au" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-white border border-zinc-200 text-[#5371FF] text-sm sm:text-base font-medium hover:bg-[#5371FF] hover:text-white transition-colors duration-200 max-w-full break-words"
                >
                  <span className="truncate">www.harbourhound.com.au</span>
                  <ExternalLink className="w-4 h-4 ml-2 flex-shrink-0" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate px-6 lg:px-8 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl font-semibold text-pretty tracking-tight text-zinc-900 sm:text-5xl mb-4 sm:mb-6">
            Join the Marina Revolution
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            We are revolutionizing how boat owners and members book & interact with marinas.
          </p>
        </motion.div>

        {/* Ultra-minimal progress indicator */}
        <div className="mb-6">
          <div className="w-full bg-zinc-100 rounded-full h-0.5">
            <div
              className="bg-[#5371FF]/60 h-0.5 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Display error message if there's an error */}
        {formError && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-600 text-sm">
            {formError}
          </div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-8 sm:space-y-12 bg-white rounded-2xl p-6 sm:p-8 shadow-lg ring-1 ring-zinc-900/5"
        >
          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Get Started</h2>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-900 mb-2">
                  <div className="flex items-center gap-2">
                    <span>Email address</span>
                    <span className="text-[#5371FF]">*</span>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-xl border-2 border-zinc-200 px-4 py-3.5 text-zinc-600 shadow-sm placeholder:text-zinc-400 focus:border-[#5371FF] focus:ring-2 focus:ring-[#5371FF]/20 focus:outline-none transition-all duration-200 text-base sm:text-sm"
                    placeholder="you@example.com"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#5371FF] animate-pulse"></div>
                  </div>
                </div>
                <p className="mt-1.5 text-xs text-zinc-500">We'll send your confirmation to this email</p>
              </div>

              <div className="flex justify-center gap-6 pt-6">
                <motion.button
                  type="submit"
                  disabled={loading}
                  className={`inline-flex items-center justify-center gap-2 w-full sm:w-auto min-w-[240px] rounded-xl bg-[#5371FF] px-6 sm:px-12 py-4 text-lg font-semibold text-white shadow-md hover:bg-[#4460E6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5371FF] transition-all duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  onClick={() => !loading && handleCTAClick('continue_step_1')}
                >
                  {loading ? 'Saving...' : 'Continue'}
                  {!loading && <ArrowRight className="w-5 h-5" />}
                </motion.button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-zinc-900">How would you like to use Harbr?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { 
                      value: "book", 
                      label: "I want to book marina berths & slips on Harbr",
                      description: "Find and book available berths instantly"
                    },
                    { 
                      value: "list", 
                      label: "I want to rent my marina berth or slip to someone else on Harbr",
                      description: "Earn money from your unused berth"
                    },
                    { 
                      value: "both", 
                      label: "I want to book & list on Harbr",
                      description: "Get the best of both worlds"
                    },
                    { 
                      value: "operator", 
                      label: "I am a marina operator/owner",
                      description: "Manage your marina efficiently"
                    }
                  ].map((option) => (
                    <label 
                      key={option.value} 
                      className={`relative flex flex-col p-4 rounded-2xl cursor-pointer transition-all duration-200 ${
                        formData.interest === option.value 
                          ? 'bg-[#EEF1FF] ring-2 ring-[#5371FF]' 
                          : 'bg-white ring-1 ring-zinc-200 hover:ring-zinc-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="interest"
                        value={option.value}
                        checked={formData.interest === option.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex items-start gap-4 w-full">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full ring-2 transition-colors mt-0.5 ${
                          formData.interest === option.value 
                            ? 'ring-[#5371FF] bg-[#5371FF]' 
                            : 'ring-zinc-300 bg-white'
                        }`}>
                          {formData.interest === option.value && (
                            <Check className="w-3 h-3 text-white m-1" strokeWidth={3} />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-zinc-900">{option.label}</span>
                          <span className="text-xs text-zinc-500 mt-1">{option.description}</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <motion.button
                  type="submit"
                  disabled={loading}
                  className={`inline-flex items-center justify-center gap-2 w-full sm:w-auto min-w-[240px] rounded-xl bg-[#5371FF] px-6 sm:px-12 py-4 text-lg font-semibold text-white shadow-md hover:bg-[#4460E6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5371FF] transition-all duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  onClick={() => !loading && handleCTAClick('continue_step_2')}
                >
                  {loading ? 'Saving...' : 'Continue'}
                  {!loading && <ArrowRight className="w-5 h-5" />}
                </motion.button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <h2 className="text-lg font-semibold text-zinc-900">Your Information</h2>
              
              {/* Name field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-900 mb-2">
                  <div className="flex items-center gap-2">
                    <span>Name</span>
                    <span className="text-[#5371FF]">*</span>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-xl border-2 border-zinc-200 px-4 py-3.5 text-zinc-600 shadow-sm placeholder:text-zinc-400 focus:border-[#5371FF] focus:ring-2 focus:ring-[#5371FF]/20 focus:outline-none transition-all duration-200 text-base sm:text-sm"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              {/* Home marina field */}
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-zinc-900 mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#5371FF]" />
                    <span>Home marina</span>
                    <span className="text-[#5371FF]">*</span>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-xl border-2 border-zinc-200 px-4 py-3.5 text-zinc-600 shadow-sm placeholder:text-zinc-400 focus:border-[#5371FF] focus:ring-2 focus:ring-[#5371FF]/20 focus:outline-none transition-all duration-200 text-base sm:text-sm"
                    placeholder="Enter marina address"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="preferredMarinas" className="block text-sm font-medium text-zinc-900 mb-2">
                    <div className="flex items-center gap-2">
                      <Anchor className="w-4 h-4 text-[#5371FF]" />
                      <span>Preferred marina(s)</span>
                      <span className="text-xs text-zinc-500">(Optional)</span>
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="preferredMarinas"
                      name="preferredMarinas"
                      value={formData.preferredMarinas}
                      onChange={handleChange}
                      className="block w-full rounded-xl border-2 border-zinc-200 px-4 py-3.5 text-zinc-600 shadow-sm placeholder:text-zinc-400 focus:border-[#5371FF] focus:ring-2 focus:ring-[#5371FF]/20 focus:outline-none transition-all duration-200 text-base sm:text-sm"
                      placeholder="Enter marina names"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-zinc-900 mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#5371FF]" />
                      <span>Booking start date</span>
                      <span className="text-xs text-zinc-500">(Optional)</span>
                    </div>
                  </label>
                  <div className="w-full">
                    <style jsx global>{`
                      /* Reset the DatePicker container styles for consistent sizing */
                      .react-datepicker-wrapper {
                        display: block !important;
                        width: 100% !important;
                      }
                      .react-datepicker__input-container {
                        display: block !important;
                        width: 100% !important;
                      }
                      .react-datepicker-popper {
                        z-index: 100 !important;
                      }
                      
                      /* Custom styles for React DatePicker to match Uber-like design */
                      .react-datepicker {
                        font-family: inherit;
                        border-radius: 0.75rem;
                        border: 1px solid #e2e8f0;
                        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                        overflow: hidden;
                      }
                      .react-datepicker__header {
                        background-color: #EEF1FF;
                        border-bottom: 1px solid #e2e8f0;
                        padding: 0.75rem 0;
                      }
                      .react-datepicker__current-month {
                        font-weight: 600;
                        font-size: 0.95rem;
                        color: #1F2937;
                        margin-bottom: 0.5rem;
                      }
                      .react-datepicker__day-name {
                        color: #6B7280;
                        font-weight: 500;
                        width: 2rem;
                        margin: 0.15rem;
                      }
                      .react-datepicker__day {
                        width: 2rem;
                        height: 2rem;
                        line-height: 2rem;
                        margin: 0.15rem;
                        border-radius: 9999px;
                        color: #1F2937;
                        transition: all 200ms;
                      }
                      .react-datepicker__day:hover {
                        background-color: #EEF1FF;
                      }
                      .react-datepicker__day--selected {
                        background-color: #5371FF !important;
                        color: white !important;
                        font-weight: 600;
                      }
                      .react-datepicker__day--today {
                        font-weight: 600;
                      }
                      .react-datepicker__triangle {
                        display: none;
                      }
                      .react-datepicker__navigation {
                        top: 0.8rem;
                      }
                      .react-datepicker__navigation--previous {
                        left: 1rem;
                      }
                      .react-datepicker__navigation--next {
                        right: 1rem;
                      }
                    `}</style>
                    <DatePicker
                      id="startDate"
                      name="startDate"
                      selected={formData.startDate ? new Date(formData.startDate) : null}
                      onChange={(date) => setFormData({...formData, startDate: date ? date.toISOString().split('T')[0] : ''})}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="dd/mm/yyyy"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      minDate={new Date()}
                      calendarClassName="uber-calendar"
                      customInput={<CustomDatePickerInput />}
                      wrapperClassName="w-full"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="stayLength" className="block text-sm font-medium text-zinc-900 mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#5371FF]" />
                    <span>Length of stay</span>
                    <span className="text-xs text-zinc-500">(Optional)</span>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="stayLength"
                    name="stayLength"
                    value={formData.stayLength}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-2 border-zinc-200 px-4 py-3.5 text-zinc-600 shadow-sm placeholder:text-zinc-400 focus:border-[#5371FF] focus:ring-2 focus:ring-[#5371FF]/20 focus:outline-none transition-all duration-200 text-base sm:text-sm"
                    placeholder="e.g., 1 week, 2 months"
                  />
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <motion.button
                  type="submit"
                  disabled={loading}
                  className={`inline-flex items-center justify-center gap-2 w-full sm:w-auto min-w-[240px] rounded-xl bg-[#5371FF] px-6 sm:px-12 py-4 text-lg font-semibold text-white shadow-md hover:bg-[#4460E6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5371FF] transition-all duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  onClick={() => !loading && handleCTAClick('submit_final')}
                >
                  {loading ? 'Saving...' : 'Join Now — It\'s Free'}
                </motion.button>
              </div>
            </div>
          )}
        </motion.form>
      </div>
    </div>
  );
} 