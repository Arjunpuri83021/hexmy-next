"use client";

import { useState, useEffect, useRef } from "react";
import Protected from "../Protected";
import AdminNavbar from "../components/AdminNavbar";
import { Terminal, Download, RefreshCw, CheckCircle, AlertTriangle, Play, Database, Link as LinkIcon, BookOpen, Layers, Flame, Copy } from "lucide-react";
import "../AdminStyles.css";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminScraperPage() {
  const [urlsInput, setUrlsInput] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const consoleEndRef = useRef(null);
  const pollingRef = useRef(null);

  // Poll status when a jobId exists
  useEffect(() => {
    if (jobId) {
      fetchJobStatus();
      pollingRef.current = setInterval(fetchJobStatus, 1500);
    } else {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    }

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [jobId]);

  // Auto scroll console logs to bottom
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [job?.logs]);

  const fetchJobStatus = async () => {
    try {
      const res = await fetch(`${apiUrl}/admin/scraper/status/${jobId}`);
      const data = await res.json();
      if (data.success) {
        setJob(data.job);
        if (data.job.status === "completed" || data.job.status === "failed") {
          if (pollingRef.current) {
            clearInterval(pollingRef.current);
          }
        }
      } else {
        setError(data.message || "Failed to fetch job status");
        if (pollingRef.current) {
          clearInterval(pollingRef.current);
        }
      }
    } catch (err) {
      console.error("Error polling scraper status:", err);
    }
  };

  const handleStartScrape = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const urls = urlsInput
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    if (urls.length === 0) {
      setError("Please enter at least one valid URL");
      setLoading(false);
      return;
    }

    // Basic URL validation
    const invalidUrl = urls.find((url) => !url.startsWith("http"));
    if (invalidUrl) {
      setError(`Invalid URL format: "${invalidUrl}". URLs must start with http:// or https://`);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/admin/scraper/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls, isPublished }),
      });
      const data = await res.json();
      if (data.success) {
        setJobId(data.jobId);
        setJob({
          status: "running",
          progress: {
            phase: "initializing",
            current: 0,
            total: urls.length,
            success: 0,
            duplicates: 0,
            failed: 0,
            message: "Starting background scraper task...",
            urlsGathered: 0,
          },
          logs: ["Job created on Express backend. Launching Playwright child process..."],
        });
      } else {
        setError(data.message || "Failed to start scraper job");
      }
    } catch (err) {
      setError("Network error starting scraper. Ensure backend API is online.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setJobId(null);
    setJob(null);
    setUrlsInput("");
    setError("");
  };

  const handleCopyLogs = () => {
    if (!job?.logs) return;
    navigator.clipboard.writeText(job.logs.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getProgressPercentage = () => {
    if (!job?.progress) return 0;
    const { phase, current, total } = job.progress;
    if (phase === "gathering") {
      return Math.round((current / (total || 1)) * 30);
    }
    if (phase === "crawling") {
      return 30 + Math.round((current / (total || 1)) * 50);
    }
    if (phase === "uploading") {
      return 80 + Math.round((current / (total || 1)) * 20);
    }
    if (job.status === "completed") return 100;
    return 0;
  };

  const activePhase = job?.progress?.phase || "none";

  return (
    <Protected>
      <div className="admin-dashboard bg-slate-50 min-h-screen">
        <AdminNavbar />
        
        <div className="admin-content py-8">
          <div className="container max-w-6xl mx-auto px-4">
            
            {/* Header section with gradient logo accent */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-tr from-sky-500 to-indigo-500 p-3 rounded-2xl text-white shadow-md shadow-sky-100">
                  <Download size={28} className={job?.status === "running" ? "animate-bounce" : ""} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Direct Web Scraper</h1>
                  <p className="text-sm text-slate-500">Crawl FullHD.xxx, Neporn.com & DaFreePorn.com and bulk upload target records to MongoDB</p>
                </div>
              </div>
              
              {jobId && (
                <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping"></span>
                  <span className="font-monospace text-xs font-semibold text-slate-600">ID: {jobId}</span>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-xl shadow-sm text-rose-800 text-sm mb-6 flex items-start gap-2 animate-fade-in">
                <AlertTriangle size={18} className="text-rose-500 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {!job ? (
              /* Setup & Input Form Section */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left guidance card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-slate-700 font-bold mb-4">
                      <BookOpen size={18} className="text-indigo-500" />
                      <span>Supported Seed URLs</span>
                    </div>
                    
                    <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                      Paste any Category listing, Model profile, or single Video page from <strong>FullHD.xxx</strong>, <strong>Neporn.com</strong>, or <strong>DaFreePorn.com</strong>.
                    </p>

                    <div className="space-y-3">
                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="badge bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-md mb-2 inline-block font-semibold">Categories</span>
                        <code className="text-[11px] text-slate-600 block break-all font-monospace mb-1">https://www.fullhd.xxx/categories/doctor/</code>
                        <code className="text-[11px] text-slate-600 block break-all font-monospace mb-1">https://neporn.com/categories/big-boobs/</code>
                        <code className="text-[11px] text-slate-600 block break-all font-monospace">https://www.dafreeporn.com/categories/amateur/</code>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="badge bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-md mb-2 inline-block font-semibold">Models</span>
                        <code className="text-[11px] text-slate-600 block break-all font-monospace mb-1">https://www.fullhd.xxx/models/alana-rose/</code>
                        <code className="text-[11px] text-slate-600 block break-all font-monospace">https://neporn.com/models/dorothy-black/</code>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="badge bg-sky-50 text-sky-700 text-xs px-2 py-1 rounded-md mb-2 inline-block font-semibold">Video Detail</span>
                        <code className="text-[11px] text-slate-600 block break-all font-monospace mb-1">https://www.fullhd.xxx/videos/93813800/the-rub/</code>
                        <code className="text-[11px] text-slate-600 block break-all font-monospace mb-1">https://neporn.com/video/40810/diamond-foxxx-step-mom...</code>
                        <code className="text-[11px] text-slate-600 block break-all font-monospace">https://www.dafreeporn.com/videos/1301558/best-friend...</code>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400 flex items-center gap-2">
                    <Flame size={14} className="text-orange-500" />
                    <span>Incognito mode with JavaScript disabled is enabled by default to prevent blocking.</span>
                  </div>
                </div>

                {/* Right Form Card */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-700 font-bold mb-6">
                    <Play size={18} className="text-sky-500" />
                    <span>Configure and Run Scraper</span>
                  </div>

                  <form onSubmit={handleStartScrape} className="space-y-6">
                    <div>
                      <label htmlFor="urls" className="block text-sm font-semibold text-slate-700 mb-2">
                        Target URLs (One per line)
                      </label>
                      <textarea
                        id="urls"
                        className="form-control font-monospace w-full rounded-2xl p-4 bg-slate-50 border-2 border-slate-100 focus:border-sky-500 focus:bg-white focus:outline-none transition-all duration-300"
                        style={{ minHeight: "220px", fontSize: "14px", lineHeight: "1.6" }}
                        value={urlsInput}
                        onChange={(e) => setUrlsInput(e.target.value)}
                        placeholder="Paste FullHD.xxx, Neporn.com or DaFreePorn.com URLs here...&#10;https://www.fullhd.xxx/categories/anal/&#10;https://neporn.com/categories/big-boobs/&#10;https://www.dafreeporn.com/categories/amateur/&#10;https://www.dafreeporn.com/videos/1301558/best-friend-wanted-to-make-her-boyfriend-jealous-so-we-shot-this-video/"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-100 hover:bg-slate-100/50 transition-colors duration-200">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-700">Immediate Publishing</span>
                        <span className="text-xs text-slate-400">If disabled, records will save in 'Draft' unpublished status</span>
                      </div>
                      <div className="form-check form-switch m-0 p-0">
                        <input
                          className="form-check-input scale-125 cursor-pointer"
                          type="checkbox"
                          id="isPublished"
                          checked={isPublished}
                          onChange={(e) => setIsPublished(e.target.checked)}
                          disabled={loading}
                          style={{ margin: 0 }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button 
                        type="submit" 
                        className="bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white shadow-md shadow-sky-100 hover:shadow-xl hover:shadow-indigo-100 transition-all duration-300 font-semibold px-8 py-3.5 rounded-2xl flex items-center gap-2 transform active:scale-95"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <RefreshCw className="animate-spin" size={18} />
                            Starting Job Execution...
                          </>
                        ) : (
                          <>
                            <Play size={18} />
                            Launch Background Job
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              /* Live Progress & Log Terminal Dashboard */
              <div className="space-y-6 animate-slide-up">
                
                {/* Overall status & Progress bar card */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping"></div>
                      <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Crawl Job In Progress</span>
                    </div>
                    
                    <span
                      className={`badge px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide text-white ${
                        job.status === "completed"
                          ? "bg-emerald-500"
                          : job.status === "failed"
                          ? "bg-rose-500"
                          : "bg-sky-500 animate-pulse"
                      }`}
                    >
                      {job.status === "running" ? "Running" : job.status}
                    </span>
                  </div>

                  {/* Horizontal Phase Stepper */}
                  <div className="grid grid-cols-3 gap-2 mb-8 text-center text-xs font-semibold select-none">
                    <div className={`py-2 px-3 rounded-xl transition-all duration-300 ${
                      activePhase === "gathering" 
                        ? "bg-sky-500 text-white shadow-md shadow-sky-100" 
                        : (activePhase === "crawling" || activePhase === "uploading" || activePhase === "complete" 
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                            : "bg-slate-50 text-slate-400")
                    }`}>
                      1. Gathering links
                    </div>
                    <div className={`py-2 px-3 rounded-xl transition-all duration-300 ${
                      activePhase === "crawling" || activePhase === "crawling_start"
                        ? "bg-sky-500 text-white shadow-md shadow-sky-100" 
                        : (activePhase === "uploading" || activePhase === "complete" 
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                            : "bg-slate-50 text-slate-400")
                    }`}>
                      2. Crawling detail
                    </div>
                    <div className={`py-2 px-3 rounded-xl transition-all duration-300 ${
                      activePhase === "uploading" || activePhase === "uploading_start"
                        ? "bg-sky-500 text-white shadow-md shadow-sky-100" 
                        : (activePhase === "complete" 
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                            : "bg-slate-50 text-slate-400")
                    }`}>
                      3. DB Upload
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-slate-700 text-xs tracking-wide">COMPLETION STATUS</span>
                      <span className="text-sky-600 font-bold text-base">{getProgressPercentage()}%</span>
                    </div>
                    <div className="progress bg-slate-100 w-full rounded-full overflow-hidden" style={{ height: "14px" }}>
                      <div
                        className={`progress-bar progress-bar-striped progress-bar-animated transition-all duration-500 rounded-full ${
                          job.status === "completed"
                            ? "bg-emerald-500"
                            : job.status === "failed"
                            ? "bg-rose-500"
                            : "bg-gradient-to-r from-sky-500 to-indigo-500"
                        }`}
                        role="progressbar"
                        style={{ width: `${getProgressPercentage()}%` }}
                        aria-valuenow={getProgressPercentage()}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p className="text-slate-400 text-xs italic font-medium">
                      Current Action: {job.progress.message || "Working..."}
                    </p>
                  </div>

                  {/* Dynamic Counters Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="border border-slate-100 bg-slate-50/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-md hover:shadow-slate-100">
                      <span className="text-slate-400 text-xs block mb-1">Seed Targets</span>
                      <span className="text-2xl font-bold text-slate-800 block">
                        {job.progress.phase === "gathering" ? job.progress.urlsGathered : job.progress.total || 0}
                      </span>
                    </div>
                    
                    <div className="border border-slate-100 bg-slate-50/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-md hover:shadow-slate-100">
                      <span className="text-slate-400 text-xs block mb-1">Videos Crawled</span>
                      <span className="text-2xl font-bold text-sky-600 block">
                        {job.progress.phase === "gathering" ? 0 : job.progress.current || 0}
                      </span>
                    </div>

                    <div className="border border-slate-100 bg-slate-50/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-md hover:shadow-slate-100">
                      <span className="text-slate-400 text-xs block mb-1">Database Inserts</span>
                      <span className="text-2xl font-bold text-emerald-600 block">
                        {job.progress.success || 0}
                      </span>
                    </div>

                    <div className="border border-slate-100 bg-slate-50/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-md hover:shadow-slate-100">
                      <span className="text-slate-400 text-xs block mb-1">Duplicates Skipped</span>
                      <span className="text-2xl font-bold text-amber-500 block">
                        {job.progress.duplicates || 0}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Styled Command Line Terminal */}
                <div className="bg-slate-950 rounded-3xl shadow-xl overflow-hidden border border-slate-800">
                  
                  {/* Terminal Header */}
                  <div className="flex justify-between items-center px-5 py-3 bg-slate-900 border-b border-slate-800 select-none">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-full bg-rose-500/80 inline-block"></span>
                        <span className="w-3.5 h-3.5 rounded-full bg-amber-500/80 inline-block"></span>
                        <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 inline-block"></span>
                      </div>
                      <span className="text-slate-400 text-xs font-monospace font-semibold ml-3">STDOUT@PLAYWRIGHT:~</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={handleCopyLogs}
                        className="text-slate-400 hover:text-white flex items-center gap-1.5 text-xs font-semibold py-1 px-3.5 rounded-lg hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all duration-200"
                        title="Copy logs to clipboard"
                      >
                        {copied ? (
                          <>
                            <CheckCircle size={14} className="text-emerald-500" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            Copy Output
                          </>
                        )}
                      </button>
                      
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <Terminal size={14} />
                        <span>{job.logs.length} Lines</span>
                      </div>
                    </div>
                  </div>

                  {/* Terminal Log Area */}
                  <div
                    className="p-5 font-monospace overflow-auto text-slate-300"
                    style={{ height: "340px", fontSize: "13px", lineHeight: "1.7" }}
                  >
                    {job.logs.length === 0 ? (
                      <div className="text-slate-600 animate-pulse">Establishing interface shell...</div>
                    ) : (
                      job.logs.map((log, idx) => {
                        let colorClass = "text-slate-300";
                        if (log.includes("[ERROR]") || log.includes("[STDERR]")) {
                          colorClass = "text-rose-400";
                        } else if (log.includes("[SYSTEM]")) {
                          colorClass = "text-sky-400 font-semibold";
                        } else if (log.includes("✅")) {
                          colorClass = "text-emerald-400";
                        } else if (log.includes("⏭️")) {
                          colorClass = "text-amber-400";
                        }
                        return (
                          <div key={idx} className={`${colorClass} hover:bg-slate-900/50 px-2 rounded transition-colors duration-100`}>
                            <span className="text-slate-600 select-none mr-3">{(idx + 1).toString().padStart(3, "0")}</span>
                            {log}
                          </div>
                        );
                      })
                    )}
                    <div ref={consoleEndRef} />
                  </div>
                </div>

                {/* Execution Finish Footer Actions */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mt-6 bg-white p-6 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    {job.status === "completed" && (
                      <>
                        <div className="bg-emerald-50 p-2.5 rounded-2xl text-emerald-600">
                          <CheckCircle size={22} />
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800 block text-sm">Execution Completed Successfully</span>
                          <span className="text-xs text-slate-400">All gathered unique records have been uploaded to MongoDB</span>
                        </div>
                      </>
                    )}
                    {job.status === "failed" && (
                      <>
                        <div className="bg-rose-50 p-2.5 rounded-2xl text-rose-600 animate-pulse">
                          <AlertTriangle size={22} />
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800 block text-sm">Job Terminated with Errors</span>
                          <span className="text-xs text-slate-400">{job.error || "Execution crashed mid-run"}</span>
                        </div>
                      </>
                    )}
                    {job.status === "running" && (
                      <>
                        <div className="bg-sky-50 p-2.5 rounded-2xl text-sky-600">
                          <RefreshCw className="animate-spin" size={22} />
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800 block text-sm">Crawler Executing Subroutines</span>
                          <span className="text-xs text-slate-400">Please do not close this browser tab while processing</span>
                        </div>
                      </>
                    )}
                  </div>

                  <button
                    onClick={handleReset}
                    className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform active:scale-95 ${
                      job.status === "running"
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                        : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100"
                    }`}
                    disabled={job.status === "running"}
                  >
                    Configure New Scrape
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Protected>
  );
}
