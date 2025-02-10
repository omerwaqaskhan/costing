import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api'

const VerifyEmail = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await api.get(`users/verify-email/${token}`)
                if (response.data.success) {
                    navigate("/login")
                    alert("Login")
                } else {
                    alert("Invalid or expired token.")
                }
            } catch (error) {
                console.log(error)
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

export default VerifyEmail
