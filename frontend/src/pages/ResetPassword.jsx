import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import LoadingIndicator from "../components/LoadingIndicator"
import api from "../api"

function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Extract the token from the query params
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Prepare formData to send the token and passwords
        const formData = new FormData();
        formData.append("token", token);
        formData.append("new_password", newPassword);
        formData.append("confirm_password", confirmPassword);

        try {
            const res = await api.post(`auth/reset-password/${token}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.status === 200) {
                navigate("/login");
            }
        } catch (error) {
            if (error.response) {
              // Server responded with a status other than 200
              alert(error.response.data.detail || "Password reset failed.");
            } else if (error.request) {
              // Request was made but no response
              alert("No response received from server. Please try again.");
            } else {
              // Some other error
              alert("An unexpected error occurred.");
            }
          } finally {
            setLoading(false);
          }
    };

    return (
        <div className="pt-[75px]">
            <form onSubmit={handleSubmit} className="form-container">
                <h1 className="py-5 text-[22px]">Reset Password</h1>

                <input
                    className="form-input"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    required
                />
                <input
                    className="form-input"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                />

                {loading && <LoadingIndicator />}
                <button className="form-button" type="submit">
                    Reset Password
                </button>
            </form>
        </div>
    );
}

export default ResetPassword;
