import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { parseResumeService, registerCandidateService, getPublishedJobsService, applyJobService,getJobStageService } from "../services/resumeService";


const useResume = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [stageData, setStageData] = useState(null);

  const parseResume = async (file) => {
    setLoading(true);
    setError(null);
    try {
      const data = await parseResumeService(file);
      setResumeData(data);
      toast.success("Resume parsed successfully!");
      return data;
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Resume parsing failed!");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const parseDate = (dateStr) => {
    if (!dateStr) return { month: "", year: "" };
    const months = {
      Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
      Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
    };
    const parts = dateStr.split(" ");
    if (parts.length >= 2) {
      return { month: months[parts[0]] || "01", year: parts[1] };
    }
    return { month: "01", year: dateStr };
  };

  const registerCandidate = async ({ formData, gender, skills, education, experience, resumeFile }) => {
    setSubmitLoading(true);
    setError(null);
    try {
      let resumeBase64 = null;
      if (resumeFile) {
        resumeBase64 = await fileToBase64(resumeFile);
      }

      const payload = {
        // ✅ Flat structure matching API expectation
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        gender: (gender || "Male").toLowerCase(),
        preferred_location: formData.preferredLocation || "",
        current_location: formData.currentLocation || "",
        total_experience: parseFloat(formData.totalExperience) || 0,
        current_ctc: parseFloat(formData.currentCTC) || 0,
        expected_ctc: parseFloat(formData.expectedCTC) || 0,
        notice_period_in_days: parseInt(formData.noticePeriod) || 0,
        skills: skills ? skills.trim() : "",
        education: education.map((edu) => ({
          degree: edu.degree || "",
          institute: edu.institute || "",
          course: edu.course || "",
          specialization: edu.specialization || "",
          board: edu.board || "",
          passing_year: edu.years || "",
          course_type: (edu.type || "Full Time").toLowerCase().replace(" ", "_"),
        })),
        experience: experience.map((exp) => {
          const duration = exp.period || "";
          const parts = duration.split("–").map(p => p.trim());
          const fromDate = parts[0] || "";
          const toDate = parts[1] || "";
          const isCurrent = toDate.toLowerCase() === "present" || toDate === "";

          const from = parseDate(fromDate);
          const to = parseDate(toDate);
          return {
            job_title: exp.title,
            company_name: exp.company,
            joining_date_from_month: from.month,
            joining_date_from_year: from.year,
            joining_date_to_month: isCurrent ? "" : to.month,
            joining_date_to_year: isCurrent ? "" : to.year,
            current_employment: isCurrent ? "yes" : "no",
            skills_used: exp.skills,
          };
        }),
        resume: resumeBase64 || "",
        resume_name: resumeFile?.name || "",
      };

      const data = await registerCandidateService(payload);
      toast.success("Candidate registered successfully!");
      localStorage.removeItem("token");
      navigate("/login");
      return data;
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Registration failed!");
      return null;
    } finally {
      setSubmitLoading(false);
    }
  };

  const getPublishedJobs = async () => {
    setJobsLoading(true);
    setError(null);
    try {
      const data = await getPublishedJobsService();
      const jobList = Array.isArray(data) ? data : (data.jobs || data.data || []);
      setJobs(jobList);
      return jobList;
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to fetch jobs!");
      return [];
    } finally {
      setJobsLoading(false);
    }
  };
  const applyJob = async (payload) => {
    setApplyLoading(true);
    setError(null);
    try {
      const data = await applyJobService(payload);
      toast.success("Application submitted successfully!");
      return data;
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to submit application!");
      return null;
    } finally {
      setApplyLoading(false);
    }
  };
 const getJobStage = async (candidateId, jobId) => {
  try {
    const data = await getJobStageService(candidateId, jobId);
    if (data?.data) setStageData(data.data);
    return data?.data || null;
  } catch (err) {
    return null;
  }
};

  return { parseResume, registerCandidate, getPublishedJobs, applyJob,getJobStage, loading, submitLoading, jobsLoading, error, resumeData, jobs };
};

export default useResume;