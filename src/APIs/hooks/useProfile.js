/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import { profileService } from "../services/profileService";

export function useProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUserProfile = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await profileService.getProfile();
            if (data && data.status === "success") {
                setProfile(data);
            } else {
                throw new Error(data?.message || "Invalid response status from server.");
            }
        } catch (err) {
            setError(err.message || "An error occurred while fetching user profile.");
        } finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);

    return {
        profile,
        loading,
        error,
        refreshProfile: fetchUserProfile,
    };
}