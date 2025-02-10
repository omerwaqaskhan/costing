import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api'

const VerifyForgotPasswordToken = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                alert(token)
                const response = await api.get(`auth/verify-forgot-password-token/${token}`);
                if (response.data.success) {
                    navigate(`/reset-password?token=${token}`);
                } else {
                    alert("Invalid or expired token.");
                }
            } catch (error) {
                console.log(error)
                // alert(error)
                // alert("An error occurred during token verification.");
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [token, navigate]);

    if (loading) {
        return <div>Verifying token, please wait...</div>;
    }

    return null; // Can be replaced with a loading indicator or error message
};

export default VerifyForgotPasswordToken
