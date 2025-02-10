import axios from "axios"
import {ACCESS_TOKEN, REFRESH_TOKEN} from "./constants"
import AuthUtils from "./utils/AuthUtils.js";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response Interceptor: Handle Token Expiration
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Avoid infinite retry loops
        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        if (error.response.status === 401) {
            try {
                const refreshToken = localStorage.getItem(REFRESH_TOKEN);

                if (refreshToken) {
                    originalRequest._retry = true;

                    // Refresh the access token
                    const refreshResponse = await axios.post(
                        `${import.meta.env.VITE_API_URL}/auth/refresh`,
                        { refresh_token: refreshToken }
                    );

                    const newAccessToken = refreshResponse.data.access_token;
                    const refreshToken = refreshResponse.data.refresh_token;
                    localStorage.setItem(ACCESS_TOKEN, newAccessToken);
                    localStorage.setItem(REFRESH_TOKEN, refreshToken);

                    // Retry the original request with the new token
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return api.request(originalRequest);
                } else {
                    AuthUtils.logout();
                    history.push("/login");
                }
            } catch (refreshError) {
                AuthUtils.logout();
                history.push("/login");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error); // Reject other errors
    }
)

// Login Function
export const login = async (username, password) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
        const response = await api.post("/users/token/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        // Save tokens to local storage
        localStorage.setItem(ACCESS_TOKEN, response.data.access_token)
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh_token)

        await get_current_user()

        return {success: true, data: response.data}
    } catch (error) {
        return {success: false, error: error.response.data}
    }
}

// Register function
export const register = async (formData, navigate) => {
    try {
        const res = await api.post("/users/register", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        if (res.data.success && res.status >= 200 && res.status < 300) {
            // navigate("/login");
            return { success: true }
        }
        else if (!res.data.success) {
            throw new Error(res.data.message)
        }
    } catch (error) {
        // Check if error.response exists
        if (error.response) {
            // Throw error with detailed message
            throw new Error(error.response.data.detail || "An error occurred during registration.");
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error("No response received from server. Please check your network.");
        } else {
            // Something happened in setting up the request that triggered an error
            throw new Error(error.message);
        }
    }
}

// Function to get current user
export const get_current_user = async () => {
    try {
        // No need to add headers, the interceptor will handle it
        const response = await api.get("/users/get_current_user_api")
        return {success: true, data: response.data};  // Return user data
    } catch (error) {
        return {success: false, error: error.response?.data || "An error occurred"};
    }
}

export default api