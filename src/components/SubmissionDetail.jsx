import { useState } from "react";
import { X, ChevronRight, User, MapPin, Anchor, Calendar, Clock, AtSign, Target } from "lucide-react";

export default function SubmissionDetail({ submission, onClose }) {
  if (!submission) return null;
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#5371FF] px-4 sm:px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Submission Details</h3>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="overflow-y-auto flex-1 p-4 sm:p-6">
          {/* Basic Info */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AtSign className="w-5 h-5 text-[#5371FF] mr-2" />
                <h4 className="text-base font-medium text-zinc-900">
                  {submission.email || "No email provided"}
                </h4>
              </div>
              <div className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                submission.is_complete 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {submission.is_complete ? 'Complete' : `Step ${submission.current_step} of 3`}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-zinc-500">ID:</span>
                <span className="ml-2 text-zinc-800">{submission.id}</span>
              </div>
              <div>
                <span className="text-zinc-500">Session ID:</span>
                <span className="ml-2 text-zinc-800 break-all text-xs">{submission.session_id}</span>
              </div>
              <div>
                <span className="text-zinc-500">Created:</span>
                <span className="ml-2 text-zinc-800">{formatDate(submission.created_at)}</span>
              </div>
              <div>
                <span className="text-zinc-500">Last Updated:</span>
                <span className="ml-2 text-zinc-800">{formatDate(submission.updated_at)}</span>
              </div>
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="space-y-4 mb-6">
            <h4 className="text-sm font-medium text-zinc-700">Form Progress</h4>
            
            <div className="space-y-3">
              {/* Step 1 */}
              <div className={`relative pl-8 pb-5 ${submission.current_step >= 1 ? 'opacity-100' : 'opacity-60'}`}>
                <div className={`absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  submission.current_step >= 1 
                    ? 'border-[#5371FF] text-[#5371FF]' 
                    : 'border-zinc-300 text-zinc-300'
                }`}>
                  <span className="text-xs font-medium">1</span>
                </div>
                <div className="absolute left-3 top-6 h-full w-px bg-zinc-200"></div>
                
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-zinc-900">Email Provided</h5>
                  <div className="flex items-center">
                    <div className="bg-zinc-100 px-3 py-2 rounded-lg text-zinc-700 text-sm">
                      <div className="flex items-center">
                        <AtSign className="text-[#5371FF] w-4 h-4 mr-2" />
                        <span>{submission.email || "No email provided"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className={`relative pl-8 pb-5 ${submission.current_step >= 2 ? 'opacity-100' : 'opacity-60'}`}>
                <div className={`absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  submission.current_step >= 2 
                    ? 'border-[#5371FF] text-[#5371FF]' 
                    : 'border-zinc-300 text-zinc-300'
                }`}>
                  <span className="text-xs font-medium">2</span>
                </div>
                <div className="absolute left-3 top-6 h-full w-px bg-zinc-200"></div>
                
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-zinc-900">Interest Selected</h5>
                  <div className="flex items-center">
                    <div className="bg-zinc-100 px-3 py-2 rounded-lg text-zinc-700 text-sm">
                      <div className="flex items-center">
                        <Target className="text-[#5371FF] w-4 h-4 mr-2" />
                        <span>
                          {(() => {
                            switch(submission.interest) {
                              case 'book': return 'Book marina berths & slips';
                              case 'list': return 'Rent my marina berth or slip';
                              case 'both': return 'Book & list on Harbr';
                              case 'operator': return 'Marina operator/owner';
                              default: return submission.interest || 'Not specified';
                            }
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className={`relative pl-8 ${submission.current_step >= 3 ? 'opacity-100' : 'opacity-60'}`}>
                <div className={`absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  submission.current_step >= 3 
                    ? 'border-[#5371FF] text-[#5371FF]' 
                    : 'border-zinc-300 text-zinc-300'
                }`}>
                  <span className="text-xs font-medium">3</span>
                </div>
                
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-zinc-900">Personal Details</h5>
                  <div className="grid grid-cols-1 gap-2">
                    {/* Name */}
                    {submission.name && (
                      <div className="bg-zinc-100 px-3 py-2 rounded-lg text-zinc-700 text-sm">
                        <div className="flex items-center">
                          <User className="text-[#5371FF] w-4 h-4 mr-2" />
                          <span>{submission.name}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Region/Marina */}
                    {submission.region && (
                      <div className="bg-zinc-100 px-3 py-2 rounded-lg text-zinc-700 text-sm">
                        <div className="flex items-center">
                          <MapPin className="text-[#5371FF] w-4 h-4 mr-2" />
                          <span>{submission.region}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Preferred Marinas */}
                    {submission.preferred_marinas && (
                      <div className="bg-zinc-100 px-3 py-2 rounded-lg text-zinc-700 text-sm">
                        <div className="flex items-start">
                          <Anchor className="text-[#5371FF] w-4 h-4 mr-2 mt-0.5" />
                          <div>
                            <div className="font-medium text-xs text-zinc-500 mb-1">Preferred Marina(s)</div>
                            <span>{submission.preferred_marinas}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Start Date */}
                    {submission.start_date && (
                      <div className="bg-zinc-100 px-3 py-2 rounded-lg text-zinc-700 text-sm">
                        <div className="flex items-center">
                          <Calendar className="text-[#5371FF] w-4 h-4 mr-2" />
                          <div>
                            <div className="font-medium text-xs text-zinc-500 mb-1">Start Date</div>
                            <span>{new Date(submission.start_date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Stay Length */}
                    {submission.stay_length && (
                      <div className="bg-zinc-100 px-3 py-2 rounded-lg text-zinc-700 text-sm">
                        <div className="flex items-center">
                          <Clock className="text-[#5371FF] w-4 h-4 mr-2" />
                          <div>
                            <div className="font-medium text-xs text-zinc-500 mb-1">Length of Stay</div>
                            <span>{submission.stay_length}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* No details provided */}
                    {!submission.name && !submission.region && !submission.preferred_marinas && 
                     !submission.start_date && !submission.stay_length && submission.current_step < 3 && (
                      <div className="text-zinc-500 text-sm italic">
                        User has not reached or completed this step
                      </div>
                    )}
                    
                    {!submission.name && !submission.region && !submission.preferred_marinas && 
                     !submission.start_date && !submission.stay_length && submission.current_step >= 3 && (
                      <div className="text-zinc-500 text-sm italic">
                        No additional details provided
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t border-zinc-200 px-4 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 