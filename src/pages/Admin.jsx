import { useState, useEffect } from "react";
import { supabase, supabaseAdmin } from "../lib/supabase";
import { Loader2, RefreshCw, Search, Download, ChevronLeft, ChevronRight, Eye, Lock, FileSpreadsheet, Users, X, Info } from "lucide-react";
import SubmissionDetail from "../components/SubmissionDetail";
import { trackEvent, trackPageView } from "../lib/analytics";

export default function Admin() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);
  const [summaryStats, setSummaryStats] = useState({
    totalSubmissions: 0,
    step1Count: 0,
    step2Count: 0,
    step3Count: 0,
    completeCount: 0,
  });
  const itemsPerPage = 10;
  
  // Get admin password from environment variable
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "";
  
  if (!ADMIN_PASSWORD) {
    console.warn("Admin password not set in environment variables. Set VITE_ADMIN_PASSWORD in your .env file.");
  }

  // Track page view when component mounts
  useEffect(() => {
    trackPageView('Admin Dashboard', { 
      is_authenticated: authenticated
    });
  }, [authenticated]);

  // Function to fetch submissions from Supabase using admin client
  const fetchSubmissions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Use the admin client to bypass RLS policies
      const { data, error } = await supabaseAdmin
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Supabase error:", error);
        throw new Error("Failed to fetch submissions. Check console for details.");
      }
      
      console.log("Submissions fetched:", data?.length || 0);
      setSubmissions(data || []);
      
      // Calculate summary statistics
      if (data && data.length > 0) {
        const stats = {
          totalSubmissions: data.length,
          step1Count: data.filter(s => s.current_step === 1).length,
          step2Count: data.filter(s => s.current_step === 2).length,
          step3Count: data.filter(s => s.current_step === 3).length,
          completeCount: data.filter(s => s.preferred_marinas && s.start_date && s.stay_length).length,
        };
        setSummaryStats(stats);
      }
      
      // If we got no data, it might be due to RLS policies or no SERVICE_ROLE key
      if (!data || data.length === 0) {
        console.warn("No submissions found. If this is unexpected, verify your Supabase SERVICE_ROLE key.");
      }
    } catch (err) {
      console.error("Error fetching submissions:", err);
      setError(err.message || "Failed to load submissions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch submissions when component mounts and is authenticated
  useEffect(() => {
    if (authenticated) {
      fetchSubmissions();
    }
  }, [authenticated]);

  // Check for stored authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('harbr-admin-auth') === 'true';
    if (isAuthenticated) {
      setAuthenticated(true);
    } else {
      setLoading(false);
    }
  }, []);

  // Handle authentication with analytics
  const handleAuthentication = (e) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setAuthError("");
      localStorage.setItem('harbr-admin-auth', 'true');
      
      trackEvent('admin_login_success');
    } else {
      setAuthError("Invalid password. Please try again.");
      
      trackEvent('admin_login_failed', {
        reason: 'incorrect_password'
      });
    }
  };

  // Handle logout with analytics
  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('harbr-admin-auth');
    
    trackEvent('admin_logout');
  };

  // Handle card filter click with analytics
  const handleCardFilterClick = (filterType) => {
    // If clicking the same filter, turn it off
    if (activeFilter === filterType) {
      trackEvent('admin_filter_removed', { 
        filter_type: activeFilter,
        previous_filter: activeFilter
      });
      setActiveFilter(null);
    } else {
      trackEvent('admin_filter_applied', { 
        filter_type: filterType,
        previous_filter: activeFilter
      });
      setActiveFilter(filterType);
    }
    
    // Reset pagination when changing filters
    setCurrentPage(1);
    
    // Clear search term when changing filters
    setSearchTerm("");
  };

  // First filter submissions based on the active card filter
  const cardFilteredSubmissions = activeFilter 
    ? submissions.filter(sub => {
        switch(activeFilter) {
          case 'step1':
            return sub.current_step === 1;
          case 'step2':
            return sub.current_step === 2;
          case 'step3':
            return sub.current_step === 3;
          case 'complete':
            return sub.preferred_marinas && sub.start_date && sub.stay_length;
          default:
            return true;
        }
      })
    : submissions;

  // Then apply search filter to the already card-filtered submissions
  const filteredSubmissions = searchTerm 
    ? cardFilteredSubmissions.filter(sub => 
        sub.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.region?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : cardFilteredSubmissions;

  // Calculate pagination
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSubmissions = filteredSubmissions.slice(startIndex, startIndex + itemsPerPage);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  // Export data to CSV with analytics
  const exportToCSV = () => {
    if (!filteredSubmissions.length) return;
    
    // Create CSV header
    const headers = [
      "ID", "Email", "Name", "Region", "Interest", 
      "Preferred Marinas", "Start Date", "Stay Length", 
      "Current Step", "Is Complete", "Created At", "Updated At"
    ];
    
    // Convert submissions to CSV rows
    const csvRows = [
      headers.join(","),
      ...filteredSubmissions.map(sub => [
        sub.id,
        `"${sub.email || ''}"`,
        `"${sub.name || ''}"`,
        `"${sub.region || ''}"`,
        `"${sub.interest || ''}"`,
        `"${sub.preferred_marinas || ''}"`,
        `"${sub.start_date || ''}"`,
        `"${sub.stay_length || ''}"`,
        sub.current_step,
        sub.is_complete,
        `"${formatDate(sub.created_at)}"`,
        `"${formatDate(sub.updated_at)}"`
      ].join(","))
    ];
    
    // Create and download CSV file
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `harbr-submissions-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Track the export action
    trackEvent('admin_export_csv', {
      record_count: filteredSubmissions.length,
      filtered: activeFilter !== null || searchTerm !== '',
      filter_type: activeFilter,
      has_search: !!searchTerm
    });
  };

  // Function to view submission details with analytics
  const viewSubmissionDetails = (submission) => {
    setSelectedSubmission(submission);
    trackEvent('admin_view_submission_details', {
      submission_id: submission.id,
      submission_email: submission.email,
      submission_step: submission.current_step,
      submission_complete: submission.is_complete
    });
  };

  // Close the submission detail modal
  const closeSubmissionDetail = () => {
    setSelectedSubmission(null);
  };

  // Login form
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-zinc-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-zinc-900">Admin Dashboard</h2>
            <p className="mt-2 text-sm text-zinc-600">Please enter the admin password to continue</p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleAuthentication}>
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-zinc-400" aria-hidden="true" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-zinc-300 placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-[#5371FF] focus:border-[#5371FF] focus:z-10 sm:text-sm"
                    placeholder="Admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {authError && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="h-5 w-5 text-red-400" aria-hidden="true">!</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{authError}</h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#5371FF] hover:bg-[#4460E6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5371FF]"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-500">View and manage form submissions</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-zinc-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-lg border border-zinc-300 bg-white py-2 pl-10 pr-3 text-sm placeholder:text-zinc-400 focus:border-[#5371FF] focus:outline-none focus:ring-1 focus:ring-[#5371FF]"
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
          
          <button
            onClick={fetchSubmissions}
            className="inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          
          <button
            onClick={exportToCSV}
            disabled={!filteredSubmissions.length}
            className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium shadow-sm ${
              !filteredSubmissions.length
                ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                : 'bg-[#5371FF] text-white hover:bg-[#4460E6]'
            }`}
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50"
          >
            Logout
          </button>
        </div>
      </div>
      
      {/* Active filter indicator */}
      {activeFilter && (
        <div className="mb-4 flex items-center">
          <span className="text-sm text-zinc-600 mr-2">Filtered by:</span>
          <div className="inline-flex items-center rounded-full px-3 py-1 bg-[#EEF1FF] text-[#5371FF] text-sm font-medium">
            {activeFilter === 'step1' && 'Step 1 Only'}
            {activeFilter === 'step2' && 'Step 2 Only'}
            {activeFilter === 'step3' && 'Step 3'}
            {activeFilter === 'complete' && 'Completed'}
            <button 
              onClick={() => setActiveFilter(null)} 
              className="ml-2 text-[#5371FF] hover:text-[#4460E6] focus:outline-none"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
      
      {/* Summary Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div 
          onClick={() => handleCardFilterClick(null)}
          className={`bg-white p-4 rounded-xl shadow border cursor-pointer transition-all duration-200 ${
            activeFilter === null 
              ? 'border-[#5371FF] ring-2 ring-[#5371FF]/20'
              : 'border-zinc-200 hover:border-zinc-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-zinc-500 text-sm font-medium">Total Submissions</h3>
            <Users className="w-5 h-5 text-[#5371FF]" />
          </div>
          <p className="text-2xl font-bold mt-2 text-zinc-900">{summaryStats.totalSubmissions}</p>
        </div>
        
        <div 
          onClick={() => handleCardFilterClick('step1')}
          className={`bg-white p-4 rounded-xl shadow border cursor-pointer transition-all duration-200 ${
            activeFilter === 'step1' 
              ? 'border-[#5371FF] ring-2 ring-[#5371FF]/20'
              : 'border-zinc-200 hover:border-zinc-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-zinc-500 text-sm font-medium">Step 1 Only</h3>
            <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-xs font-medium text-amber-700">1</div>
          </div>
          <p className="text-2xl font-bold mt-2 text-zinc-900">{summaryStats.step1Count}</p>
        </div>
        
        <div 
          onClick={() => handleCardFilterClick('step2')}
          className={`bg-white p-4 rounded-xl shadow border cursor-pointer transition-all duration-200 ${
            activeFilter === 'step2' 
              ? 'border-[#5371FF] ring-2 ring-[#5371FF]/20'
              : 'border-zinc-200 hover:border-zinc-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-zinc-500 text-sm font-medium">Step 2 Only</h3>
            <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-xs font-medium text-amber-700">2</div>
          </div>
          <p className="text-2xl font-bold mt-2 text-zinc-900">{summaryStats.step2Count}</p>
        </div>
        
        <div 
          onClick={() => handleCardFilterClick('step3')}
          className={`bg-white p-4 rounded-xl shadow border cursor-pointer transition-all duration-200 ${
            activeFilter === 'step3' 
              ? 'border-[#5371FF] ring-2 ring-[#5371FF]/20'
              : 'border-zinc-200 hover:border-zinc-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-zinc-500 text-sm font-medium">Step 3</h3>
            <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-xs font-medium text-amber-700">3</div>
          </div>
          <p className="text-2xl font-bold mt-2 text-zinc-900">{summaryStats.step3Count}</p>
        </div>
        
        <div 
          onClick={() => handleCardFilterClick('complete')}
          className={`bg-white p-4 rounded-xl shadow border cursor-pointer transition-all duration-200 ${
            activeFilter === 'complete' 
              ? 'border-[#5371FF] ring-2 ring-[#5371FF]/20'
              : 'border-zinc-200 hover:border-zinc-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-zinc-500 text-sm font-medium">Completed</h3>
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-xs font-medium text-green-700">✓</div>
          </div>
          <p className="text-2xl font-bold mt-2 text-zinc-900">{summaryStats.completeCount}</p>
        </div>
      </div>
      
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-600 text-sm">
          {error}
        </div>
      )}
      
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-zinc-200 text-sm">
            <thead className="bg-zinc-50">
              <tr>
                <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold uppercase text-zinc-500">Email</th>
                <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold uppercase text-zinc-500">Name</th>
                <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold uppercase text-zinc-500">Home Marina</th>
                <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold uppercase text-zinc-500">Preferred Marinas</th>
                <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold uppercase text-zinc-500">Start Date</th>
                <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold uppercase text-zinc-500">Stay Length</th>
                <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold uppercase text-zinc-500">
                  <div className="flex items-center">
                    Interest
                    <div className="group relative ml-1">
                      <Info className="h-3.5 w-3.5 text-zinc-400 cursor-help" />
                      <div className="absolute left-0 top-full z-10 mt-2 w-72 rounded-md bg-zinc-800 px-3 py-2 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                        <div className="font-medium mb-1 text-zinc-200">Interest Values:</div>
                        <ul className="space-y-1">
                          <li><strong className="text-cyan-300">book</strong>: Book marina berths & slips</li>
                          <li><strong className="text-cyan-300">list</strong>: Rent my marina berth or slip</li>
                          <li><strong className="text-cyan-300">both</strong>: Book & list on Harbr</li>
                          <li><strong className="text-cyan-300">operator</strong>: Marina operator/owner</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3.5 text-center text-xs font-semibold uppercase text-zinc-500">Step</th>
                <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold uppercase text-zinc-500">Complete</th>
                <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold uppercase text-zinc-500">Created At</th>
                <th scope="col" className="px-4 py-3.5 text-center text-xs font-semibold uppercase text-zinc-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {loading ? (
                <tr>
                  <td colSpan={11} className="px-4 py-10 text-center text-sm text-zinc-500">
                    <div className="flex justify-center items-center space-x-2">
                      <Loader2 className="w-5 h-5 animate-spin text-zinc-400" />
                      <span>Loading submissions...</span>
                    </div>
                  </td>
                </tr>
              ) : !paginatedSubmissions.length ? (
                <tr>
                  <td colSpan={11} className="px-4 py-10 text-center text-sm text-zinc-500">
                    {searchTerm || activeFilter ? 'No matching submissions found.' : 'No submissions yet.'}
                  </td>
                </tr>
              ) : (
                paginatedSubmissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-zinc-50">
                    <td className="whitespace-nowrap px-4 py-4 font-medium text-zinc-900">{submission.email || '-'}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-zinc-700">{submission.name || '-'}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-zinc-700">{submission.region || '-'}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-zinc-700">{submission.preferred_marinas || '-'}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-zinc-700">{submission.start_date ? new Date(submission.start_date).toLocaleDateString() : '-'}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-zinc-700">{submission.stay_length || '-'}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-zinc-700">
                      {(() => {
                        switch(submission.interest) {
                          case 'book': return 'Book berths';
                          case 'list': return 'List berth';
                          case 'both': return 'Book & list';
                          case 'operator': return 'Marina operator';
                          default: return submission.interest || '-';
                        }
                      })()}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <div className="flex items-center space-x-1">
                          <div className={`w-2.5 h-2.5 rounded-full ${
                            submission.current_step >= 1 ? 'bg-[#5371FF]' : 'bg-zinc-200'
                          }`}></div>
                          <div className={`w-2.5 h-2.5 rounded-full ${
                            submission.current_step >= 2 ? 'bg-[#5371FF]' : 'bg-zinc-200'
                          }`}></div>
                          <div className={`w-2.5 h-2.5 rounded-full ${
                            submission.current_step >= 3 ? 'bg-[#5371FF]' : 'bg-zinc-200'
                          }`}></div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        submission.is_complete 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {submission.is_complete ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-zinc-700">{formatDate(submission.created_at)}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-center">
                      <button
                        onClick={() => viewSubmissionDetails(submission)}
                        className="inline-flex items-center justify-center p-1.5 rounded-full text-zinc-500 hover:text-[#5371FF] hover:bg-[#EEF1FF] focus:outline-none"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-zinc-200 bg-white px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-zinc-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">
                    {Math.min(startIndex + itemsPerPage, filteredSubmissions.length)}
                  </span> of <span className="font-medium">{filteredSubmissions.length}</span> results
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${
                      currentPage === 1 
                        ? 'cursor-not-allowed'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        currentPage === index + 1
                          ? 'z-10 bg-[#5371FF] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5371FF]'
                          : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${
                      currentPage === totalPages 
                        ? 'cursor-not-allowed'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Submission Details Modal */}
      {selectedSubmission && (
        <SubmissionDetail 
          submission={selectedSubmission} 
          onClose={closeSubmissionDetail} 
        />
      )}
    </div>
  );
} 