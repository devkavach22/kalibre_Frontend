import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import toast from "react-hot-toast";
import { registerHrService } from "../services/hrService";

const useHr = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);

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
                    location_city: formData.companyLocation.split(',')[0]?.trim() || formData.companyLocation,
                    location_state: formData.companyLocation.split(',')[1]?.trim() || "",
                    logo_base64: logoFileDetails?.base64 || null,
                    logo_filename: logoFileDetails?.filename || ""
                },
                recruiter_details: {
                    name: formData.fullName,
                    email: formData.recruiterEmail,
                    phone: formData.recruiterPhone,
                    dob: formData.dob,
                    gender: formData.gender,
                    preferred_location: formData.preferredLocation || "",
                    current_location: formData.recruiterLocation
                },
                verification: {
                    gst_number: formData.gstNumber,
                    pan_number: formData.panNumber || "",
                    business_registration_no: formData.businessRegNo,
                    id_proof_base64: idProofDetails?.base64 || "",
                    id_proof_filename: idProofDetails?.filename || ""
                }
            };

            const data = await registerHrService(payload);

            toast.success(data.message || "Registration Successful!");
            setSubmitted(true);

            // ⚠️ IMP: Login page pe navigate karne se pehle token clear karna zaroori hai
            // taaki PublicRoute isko pakad kar wapas Home Page (/) par mat fenke!
            localStorage.removeItem("token"); 

            // Success hote hi login page pe move karega bina kisi restriction issue ke
            navigate("/login"); 
            return true;
        } catch (err) {
            setError(err.message);
            toast.error(err.message || "Registration failed!");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        registerHr,
        loading,
        error,
        submitted,
        setSubmitted
    };
};

export default useHr;