import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    registerHrService,
    createJobService,
    createDepartmentService,
    getDepartmentsService,
    getLanguagesService,
    getRecruiterJobsService,
    publishJobService
} from "../services/hrService";

export default function useHr() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [deptLoading, setDeptLoading] = useState(false);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const [departments, setDepartments] = useState([]);
    const [languages, setLanguages] = useState([]);

    const fetchRecruiterJobs = async (setJobsState) => {
        setLoading(true);
        setError(null);
        try {
            const response = await getRecruiterJobsService();
            if (response && response.status) {
                if (typeof setJobsState === "function") {
                    setJobsState(response.jobs || []);
                }
            }
        } catch (err) {
            console.error("Fetch recruiter jobs failure:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const registerHr = async (formData, logoFileDetails, idProofDetails) => {
        setLoading(true);
        setError(null);
        try {
            const payload = {
                company_details: {
                    name: formData.companyName,
                    email: formData.companyEmail,
                    phone: formData.companyPhone,
                    website: formData.websiteUrl || "",
                    location_city: formData.companyLocation.split(",")[0]?.trim() || formData.companyLocation,
                    location_state: formData.companyLocation.split(",")[1]?.trim() || "",
                    logo_base64: logoFileDetails?.base64 || null,
                    logo_filename: logoFileDetails?.filename || "",
                },
                recruiter_details: {
                    name: formData.fullName,
                    email: formData.personalEmail,
                    phone: formData.personalPhone,
                    designation: formData.designation,
                    id_proof_base64: idProofDetails?.base64 || null,
                    id_proof_filename: idProofDetails?.filename || "",
                }
            };
            const data = await registerHrService(payload);
            toast.success(data.message || "Registration Successful!");
            setSubmitted(true);
            return true;
        } catch (err) {
            setError(err.message);
            toast.error(err.message || "Something went wrong!");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const createDepartment = async (departmentName) => {
        setDeptLoading(true);
        setError(null);
        try {
            const payload = { name: departmentName };
            const data = await createDepartmentService(payload);
            toast.success(data.message || "Department Verified/Created Successfully! 🏢");
            return true;
        } catch (err) {
            setError(err.message);
            toast.error(err.message || "Failed to establish department.");
            return false;
        } finally {
            setDeptLoading(false);
        }
    };

    const fetchDepartments = async () => {
        try {
            const data = await getDepartmentsService();
            if (data && Array.isArray(data.departments)) {
                setDepartments(data.departments);
            } else if (data && Array.isArray(data)) {
                setDepartments(data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const fetchLanguages = async () => {
        try {
            const data = await getLanguagesService();
            if (data && Array.isArray(data.languages)) {
                setLanguages(data.languages);
            } else if (data && Array.isArray(data)) {
                setLanguages(data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const createJob = async (form) => {
        setLoading(true);
        setError(null);
        try {
            const payload = {
                job_details: {
                    name: form.jobTitle,
                    client_selection: form.companyName,
                    department_names: [form.department],
                    location: form.jobLocation,
                    experience_from: parseFloat(form.minExp) || 0,
                    experience_to: parseFloat(form.maxExp) || 0,
                    budget_from: parseFloat(form.minSalary) || 0,
                    budget_to: parseFloat(form.maxSalary) || 0,
                    no_of_recruitment: parseInt(form.openPositions) || 1,
                    gender: form.gender ? form.gender.toLowerCase() : "any",
                },
                candidate_preferences: {
                    language_name: form.languages.join(", "),
                    skills: form.requiredSkills.join(", "),
                    certifications: form.certifications,
                    required_qualifications: form.qualification,
                },
                screening_questions: {
                    screening_notice_period: form.noticePeriod,
                    screening_immediate_joining: form.immediateJoining === "Yes",
                    screening_relocation_preference: form.relocation === "Yes",
                    screening_work_authorization: form.workAuth === "Indian Citizen",
                    screening_questions: form.addedQuestions,
                },
                job_description: {
                    about_the_role: form.aboutRole,
                    key_responsibilities: Array.isArray(form.responsibilities)
                        ? form.responsibilities.map((r, index) => `${index + 1}. ${r}`).join('\n')
                        : form.responsibilities,
                },
                communication_preferences: {
                    comm_email: form.emailNotif,
                    comm_sms: form.smsAlerts,
                    comm_whatsapp: form.whatsappUpdates,
                    comm_reminders: form.interviewReminders,
                },
                company_details: {
                    company_overview: form.companyOverview,
                    company_logo: form.logo && form.logo.includes(',') ? form.logo.split(',')[1] : form.logo,
                    company_email: form.email,
                    company_website: form.website,
                    company_phone: form.phone,
                },
            };

            const data = await createJobService(payload);
            toast.success(data.message || "Job integration completed successfully! 🎉");
            return true;
        } catch (err) {
            setError(err.message);
            toast.error(err.message || "Something went wrong!");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const publishJob = async (job_position_id, setJobsState) => {
        try {
            const data = await publishJobService(job_position_id);
            toast.success(data.message || "Job published successfully!");
            // Refresh jobs list after publish
            if (typeof setJobsState === "function") {
                fetchRecruiterJobs(setJobsState);
            }
            return true;
        } catch (err) {
            toast.error(err.message || "Failed to publish job!");
            return false;
        }
    };

    return {
        createJob,
        registerHr,
        createDepartment,
        fetchDepartments,
        fetchLanguages,
        fetchRecruiterJobs,
        publishJob,
        departments,
        languages,
        loading,
        deptLoading,
        error,
        submitted,
    };
}