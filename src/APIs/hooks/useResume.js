import { useState } from "react";
import toast from "react-hot-toast";
import { parseResumeService, registerCandidateService, getPublishedJobsService } from "../services/resumeService";

const useResume = () => {
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
      Jan:"01", Feb:"02", Mar:"03", Apr:"04", May:"05", Jun:"06",
      Jul:"07", Aug:"08", Sep:"09", Oct:"10", Nov:"11", Dec:"12",
      January:"01", February:"02", March:"03", April:"04", June:"06",
      July:"07", August:"08", September:"09", October:"10", November:"11", December:"12",
    };
    const parts = dateStr.trim().split(" ");
    return { month: months[parts[0]] || "", year: parts[1] || "" };
  };

  const registerCandidate = async ({ formData, gender, skills, education, experience, resumeFile }) => {
    setSubmitLoading(true);
    setError(null);
    try {
      let resumeBase64 = "";
      let resumeName = "";
      if (resumeFile) {
        resumeBase64 = await fileToBase64(resumeFile);
        resumeName = resumeFile.name;
      }

      const payload = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        gender: gender.toLowerCase(),
        current_location: formData.currentLocation,
        preferred_location: formData.preferredLocation,
        total_experience: parseFloat(formData.totalExperience) || 0,
        current_ctc: parseFloat(formData.currentCTC) || 0,
        expected_ctc: parseFloat(formData.expectedCTC) || 0,
        notice_period_in_days: parseInt(formData.noticePeriod) || 0,
        skills: skills,

        // ✅ Education payload now includes course, specialization, board
        education: education.map((edu) => ({
          degree: edu.degree,
          institute: edu.institute,
          passing_year: edu.years,
          course_type: edu.type.toLowerCase().replace(" ", "_"),
          course: edu.course || "",
          specialization: edu.specialization || "",
          board: edu.board || "",
        })),

        experience: experience.map((exp) => {
          const parts = exp.period?.split("–").map((s) => s.trim()) || [];
          const fromDate = parts[0] || "";
          const toDate = parts[1] || "";
          const isCurrent = !toDate || toDate.toLowerCase().includes("present");
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

  return { parseResume, registerCandidate, getPublishedJobs, resumeData, jobs, loading, submitLoading, jobsLoading, error };
};

export default useResume;