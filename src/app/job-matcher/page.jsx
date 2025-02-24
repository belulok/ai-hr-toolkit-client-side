"use client";
import React, { useState } from 'react';
import {
  Upload,
  CheckCircle,
  AlertCircle,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  Building,
  Code,
  Loader2,
  BookOpen,
  Target,
  TrendingUp,
  Award,
  Link as LinkIcon
} from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://159.65.7.160';

// -----------------------------------------
// NO CHANGES in these existing components:
// ResumeDetails, LoadingState, SkillBar, RecommendationCard
// Only fix the conditional checks in main code
// -----------------------------------------

function ResumeDetails({ data }) {
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Personal Info */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 text-gray-300">
            <Briefcase className="h-5 w-5 text-blue-400" />
            <span>{data.name}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-300">
            <Mail className="h-5 w-5 text-blue-400" />
            <span>{data.email}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-300">
            <Phone className="h-5 w-5 text-blue-400" />
            <span>{data.phone}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-300">
            <GraduationCap className="h-5 w-5 text-blue-400" />
            <span>{data.education}</span>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <div className="flex items-center space-x-3 mb-4">
          <Code className="h-6 w-6 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">Technical Skills</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.skills?.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full text-sm font-medium bg-blue-900/30 text-blue-300 border border-blue-800"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <div className="flex items-center space-x-3 mb-4">
          <Building className="h-6 w-6 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">Work Experience</h3>
        </div>
        <div className="space-y-6">
          {data.experiences?.map((exp) => (
            <div key={exp.company} className="border-l-2 border-gray-800 pl-4">
              <h4 className="text-lg font-medium text-gray-200">{exp.company}</h4>
              <div className="mt-2 space-y-2">
                {exp.roles?.map((role) => (
                  <div key={role.title} className="text-gray-400">
                    <p className="text-blue-400">{role.title}</p>
                    <p className="text-sm">{role.period}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <Loader2 className="h-12 w-12 text-blue-400 animate-spin mb-4" />
      <p className="text-gray-400">Analyzing resume...</p>
    </div>
  );
}

function SkillBar({ category, percentage }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-300">{category}</span>
        <span className="text-sm font-medium text-blue-400">{percentage}%</span>
      </div>
      <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function RecommendationCard({ title, description, resources, icon: Icon }) {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
      <div className="flex items-center space-x-3 mb-4">
        <Icon className="h-6 w-6 text-blue-400" />
        <h4 className="text-lg font-medium text-white">{title}</h4>
      </div>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className="space-y-2">
        <h5 className="text-sm font-medium text-gray-300">Recommended Resources:</h5>
        <ul className="space-y-1">
          {resources.map((resource) => (
            <li key={resource.name}>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                {resource.name} →
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------
// MAIN COMPONENT: JobMatcherPage (with minimal fixes for mapping)
// -----------------------------------------------------------------
function JobMatcherPage() {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUploadResult, setResumeUploadResult] = useState(null);
  const [jobURL, setJobURL] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchResult, setMatchResult] = useState(null);
  const [jobStructuredData, setJobStructuredData] = useState(null); // new state for extracted job info
  const [jobId, setJobId] = useState(null); // new state for extracted job info

  const handleResumeUpload = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
      try {
        const formData = new FormData();
        formData.append('resume', file);

        const res = await fetch(`${API_BASE_URL}/upload_resume`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Error uploading resume.');
        }
        setResumeUploadResult(data);
      } catch (err) {
        console.error('Error uploading resume:', err);
        setResumeUploadResult({ error: err.message });
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsAnalyzing(true);

    try {
      // Upload job by URL
      const jobRes = await fetch(`${API_BASE_URL}/upload_job_by_url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_url: jobURL }),
      });
      const jobData = await jobRes.json();
      
      if (!jobRes.ok) {
        throw new Error(jobData.error || 'Error processing job URL.');
      }
      
      setJobStructuredData(jobData.structured_data); // store in state

      // Then match
      const matchRes = await fetch(`${API_BASE_URL}/match/${jobData.job_id}`);
      const matchData = await matchRes.json();

      if (!matchRes.ok) {
        throw new Error(matchData.error || 'Error matching resumes.');
      }

      // We'll handle the case if there's no matches or if 
      // 'skillAnalysis' / 'recommendations' are missing 
      if (!matchData.matches || !matchData.matches[0]) {
        setMatchResult({ error: "No matching resumes found or none in DB." });
        return;
      }

      const topMatch = matchData.matches[0];
      // If skillAnalysis or recommendations are missing, set fallback
      const transformedResult = {
        matchPercentage: Math.round((topMatch.similarity_score || 0) * 100),
        missingSkills: topMatch.missing_skills || [],
        strongPoints: topMatch.resume_skills || [],
        // Provide safe fallback for skillAnalysis
        skillAnalysis: topMatch.skillAnalysis || {
          technical: 0,
          experience: 0,
          education: 0,
          tooling: 0
        },
        // Provide safe fallback for recommendations
        recommendations: topMatch.recommendations || []
      };

      setMatchResult(transformedResult);
    } catch (err) {
      console.error('Error:', err);
      setMatchResult({ error: err.message });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Upload Forms */}
        <div className="space-y-8">
          {/* Resume Upload */}
          <div className="bg-black/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-800 p-8">
            <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-6">
              Upload Resume (PDF)
            </h2>
            <div className="space-y-4">
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-800 border-dashed rounded-xl bg-gray-900/30 hover:bg-gray-900/50 transition-colors duration-200">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-blue-400" />
                  <div className="flex text-sm text-gray-300">
                    <label className="relative cursor-pointer rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload Resume</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept=".pdf"
                        onChange={handleResumeUpload}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PDF files only</p>
                </div>
              </div>

              {isAnalyzing ? (
                <LoadingState />
              ) : (
                resumeUploadResult && !resumeUploadResult.error && (
                  <ResumeDetails data={resumeUploadResult.parsed_data} />
                )
              )}

              {resumeUploadResult?.error && (
                <div className="mt-4 p-4 rounded-xl bg-rose-900/30 border border-rose-800">
                  <p className="text-rose-300">{resumeUploadResult.error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Job Link Upload */}
          <div className="bg-black/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-800 p-8">
            <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-6">
              Job Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Job Posting URL</label>
                <div className="mt-1 relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LinkIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    value={jobURL}
                    onChange={(e) => setJobURL(e.target.value)}
                    className="block w-full pl-10 h-10 rounded-xl bg-gray-700/30 border-gray-800 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500/20 text-gray-200"
                    placeholder="Paste the job posting URL here..."
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-gray-300">
                  Paste the URL of the job posting you want to analyze
                </p>
              </div>

              <button
                type="submit"
                disabled={!resumeFile || !jobURL || isAnalyzing}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white transition-all duration-200 ${
                  !resumeFile || !jobURL || isAnalyzing
                    ? 'bg-gray-800 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
              >
                {isAnalyzing ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  'Match Job'
                )}
              </button>
            </form>

            {jobStructuredData && (
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800 text-gray-300 my-5">
                <h3 className="text-lg font-semibold text-white mb-4">Extracted Job Info</h3>
                <p><strong>Website:</strong> {jobStructuredData.website_name}</p>
                <p><strong>Title:</strong> {jobStructuredData.job_title}</p>
                <p><strong>Company:</strong> {jobStructuredData.company}</p>
                <p><strong>Experience Required:</strong> {jobStructuredData.experience_required}</p>
                <p><strong>Education:</strong> {jobStructuredData.education}</p>

                <strong>Skills Required:</strong>
                {jobStructuredData.skills_required?.length ? (
                  <ul className="list-disc list-inside">
                    {jobStructuredData.skills_required.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                ) : (
                  <span>None</span>
                )}
                <p className="mt-2">
                  <strong>Role Description:</strong> {jobStructuredData.role_description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-8">
          {/* If there's an error in matchResult */}
          {matchResult?.error && (
            <div className="bg-black/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-rose-800 p-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-6">Error</h2>
              <p className="text-rose-300">{matchResult.error}</p>
            </div>
          )}

          {/* If there's a valid matchResult without error */}
          {matchResult && !matchResult.error && (
            <>
              <div className="bg-black/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-800 p-8">
                <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-6">
                  Match Results
                </h2>

                <div className="space-y-6">
                  {/* Match Score */}
                  <div className="flex items-center justify-between p-6 rounded-xl bg-gray-900/30 border border-gray-800">
                    <span className="text-lg font-medium text-gray-300">Overall Match</span>
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"></div>
                      <span className="relative text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                        {matchResult.matchPercentage}%
                      </span>
                    </div>
                  </div>

                  {/* Conditionally show Skill Analysis if it exists */}
                  {matchResult.skillAnalysis && (
                    <div className="p-6 rounded-xl bg-gray-900/30 border border-gray-800">
                      <h3 className="text-lg font-medium text-white mb-6">Skill Analysis</h3>
                      <div className="space-y-4">
                        <SkillBar category="Technical Skills" percentage={matchResult.skillAnalysis.technical} />
                        <SkillBar category="Experience" percentage={matchResult.skillAnalysis.experience} />
                        <SkillBar category="Education" percentage={matchResult.skillAnalysis.education} />
                        <SkillBar category="Tools & Technologies" percentage={matchResult.skillAnalysis.tooling} />
                      </div>
                    </div>
                  )}

                  {/* Matching Skills */}
                  <div className="p-6 rounded-xl bg-gray-900/30 border border-gray-800">
                    <h3 className="flex items-center text-lg font-medium text-emerald-400 mb-4">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Matching Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.strongPoints.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-900/30 text-emerald-300 border border-emerald-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Missing Skills */}
                  <div className="p-6 rounded-xl bg-gray-900/30 border border-gray-800">
                    <h3 className="flex items-center text-lg font-medium text-rose-400 mb-4">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      Missing Requirements
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.missingSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full text-sm font-medium bg-rose-900/30 text-rose-300 border border-rose-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations section (only if we have them) */}
              {matchResult.recommendations && matchResult.recommendations.length > 0 && (
                <div className="bg-black/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-800 p-8">
                  <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-6">
                    Improvement Recommendations
                  </h2>
                  <div className="grid gap-6">
                    {matchResult.recommendations.map((rec, index) => (
                      <RecommendationCard
                        key={rec.title}
                        {...rec}
                        icon={[BookOpen, Target, TrendingUp][index] || Award}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default JobMatcherPage;
