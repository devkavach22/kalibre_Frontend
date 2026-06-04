import { useState, useEffect } from 'react';
import { adminService } from '../services/adminService'; // Adjust path accordingly

export const useAdminDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await adminService.getDashboardData();
        
        if (response.status === "success") {
          setCompanies(response.employers || []);
          setRecruiters(response.recruiters || []);
        } else {
          throw new Error(response.message || "Failed to fetch dashboard data");
        }
      } catch (err) {
        setError(err.message || "Something went wrong while loading data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { companies, recruiters, loading, error };
};