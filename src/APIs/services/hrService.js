import apiClient from "../token/apiClient";
import { URLS } from "../baseURL/url";

export const registerHrService = async (payload) => {
  return apiClient(URLS.RECRUITMENT.REGISTER, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};