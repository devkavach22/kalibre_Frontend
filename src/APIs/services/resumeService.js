import apiClient from "../token/apiClient";
import { URLS } from "../baseURL/url";

export const parseResumeService = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  return apiClient(URLS.RESUME.PARSE, {
    method: "POST",
    body: formData,
  });
};

export const registerCandidateService = async (payload) => {
  return apiClient(URLS.CANDIDATE.REGISTER, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const getPublishedJobsService = async () => {
  return apiClient(URLS.JOBS.GET_PUBLISHED, {
    method: "GET",
  });
};

export const applyJobService = async (payload) => {
  return apiClient(URLS.JOBS.APPLY, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};


export const getJobStageService = async (candidateId, jobId) => {
  return apiClient(URLS.JOBS.JOB_STAGE, {
    method: "POST",
    body: JSON.stringify({ candidate_id: candidateId, job_id: jobId }),
  });
};