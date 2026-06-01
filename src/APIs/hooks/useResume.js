import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import toast from "react-hot-toast";
import { parseResumeService, registerCandidateService, getPublishedJobsService } from "../services/resumeService";

const useResume = () => {
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [jobs, setJobs] = useState([]);

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

  const registerCandidate = async (formData, education, experience, resumeFile, resumeName) => {
    setSubmitLoading(true);
    setError(null);
    try {
      let resumeBase64 = null;
      if (resumeFile) {
        resumeBase64 = await fileToBase64(resumeFile);
      }

      const payload = {
        personal_details: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          dob: formData.dob,
          gender: formData.gender || "Male",
          preferred_location: formData.preferredLocation || "",
          current_location: formData.currentLocation || "",
        },
        professional_details: {
          total_experience: formData.totalExperience || "",
          current_ctc: formData.currentCTC || "",
          expected_ctc: formData.expectedCTC || "",
          notice_period: formData.noticePeriod || "",
          skills: formData.skills ? formData.skills.split(",").map(s => s.trim()) : [],
        },
        education_details: education.map((edu) => ({
          degree: edu.degree,
          field_of_study: edu.field,
          college_or_university: edu.college,
          passing_year: edu.year,
          percentage_or_cgpa: edu.grade,
        })),
        experience_details: experience.map((exp) => {
          const duration = exp.duration || "";
          const parts = duration.split("–").map(p => p.trim());
          const fromDate = parts[0] || "";
          const toDate = parts[1] || "";
          const isCurrent = toDate.toLowerCase() === "present";

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
        resume: resumeBase64,
        resume_name: resumeName,
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

  return { parseResume, registerCandidate, getPublishedJobs, loading, submitLoading, jobsLoading, error, resumeData, jobs };
};

export default useResume;