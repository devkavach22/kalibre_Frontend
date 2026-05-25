const BASE_URL = "http://192.168.11.62:7788/api";
export const URLS = {
  AUTH: {
    SIGNUP: `${BASE_URL}/auth/signup`,
    LOGIN: `${BASE_URL}/auth/login`,
    FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,
  },
  RESUME: {
    PARSE: `${BASE_URL}/candidate/parse_resume`, 
  },
  CANDIDATE: {
  REGISTER: `${BASE_URL}/candidate/register`,
},
};