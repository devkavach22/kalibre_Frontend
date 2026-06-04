import apiClient from "../token/apiClient"; 
import { URLS } from "../baseURL/url";    

export const adminService = {
  getDashboardData: async () => {
    try {
      return await apiClient(URLS.ADMIN.GET_DASHBOARD, {
        method: "GET",
      });
    } catch (error) {
      console.error("API Fetch Error in adminService:", error);
      throw error;
    }
  },
};