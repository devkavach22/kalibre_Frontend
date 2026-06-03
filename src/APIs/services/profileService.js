import apiClient from "../token/apiClient";
import { URLS } from "../baseURL/url";
export const profileService = {
  getProfile: async () => {
    return apiClient(URLS.AUTH.PROFILE, {
      method: "GET",
    });
  },
};