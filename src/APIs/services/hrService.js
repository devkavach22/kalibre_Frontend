import apiClient from "../token/apiClient";
import { URLS } from "../baseURL/url";

export const registerHrService = async (payload) => {
  return apiClient(URLS.RECRUITMENT.REGISTER, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const createJobService = async (payload) => {
  return apiClient(URLS.JOBS_MANAGEMENT.CREATE_JOB, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const createDepartmentService = async (payload) => {
  return apiClient(URLS.JOBS_MANAGEMENT.CREATE_DEPARTMENT, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const getDepartmentsService = async () => {
  return apiClient(URLS.JOBS_MANAGEMENT.GET_DEPARTMENTS, {
    method: "GET",
  });
};

export const getLanguagesService = async () => {
  return apiClient(URLS.JOBS_MANAGEMENT.GET_LANGUAGES, {
    method: "GET",
  });
};

// Naya Service Function Recruiter Jobs List Fetch karne ke liye
export const getRecruiterJobsService = async () => {
  return apiClient(URLS.JOBS.GET_RECRUITER_JOBS, {
    method: "GET",
  });
};