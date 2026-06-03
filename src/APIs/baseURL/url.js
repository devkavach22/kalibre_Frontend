const BASE_URL = "http://192.168.11.62:7788/api";

export const URLS = {
  AUTH: {
    SIGNUP: `${BASE_URL}/auth/signup`,
    LOGIN: `${BASE_URL}/auth/login`,
    FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,
    PROFILE: `${BASE_URL}/auth/profile`, 
  },
  RESUME: {
    PARSE: `${BASE_URL}/candidate/parse_resume`,
  },
  CANDIDATE: {
    REGISTER: `${BASE_URL}/candidate/register`,
  },
  JOBS: {
    GET_PUBLISHED: `${BASE_URL}/get_published_jobs`,
    GET_RECRUITER_JOBS: `${BASE_URL}/get_recruiter_jobs`,
  },
  RECRUITMENT: {
    REGISTER: `${BASE_URL}/recruitment/register`,
  },
  JOBS_MANAGEMENT: {
    CREATE_JOB: `${BASE_URL}/create_job_position`,
    CREATE_DEPARTMENT: `${BASE_URL}/create_department`,
    GET_DEPARTMENTS: `${BASE_URL}/get_departments`,
    GET_LANGUAGES: `${BASE_URL}/get_languages`,
    PUBLISH_JOB: `${BASE_URL}/publish_job_position`,
  },
  EMPLOYER: {
    VERIFY_GST: `${BASE_URL}/verify_gst`,
    REGISTER: `${BASE_URL}/employer/register`,
  },
};
