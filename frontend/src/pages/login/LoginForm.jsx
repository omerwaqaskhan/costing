import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, get_current_user } from '../../api.js'; 
import { saveUserData } from '../../redux/userSlice.js';


const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        setShowError(false);
        setLoading(true);
        e.preventDefault();

        try {
            // Use the login function from api.js
            const result = await login(username, password);
            if (result.success) {
                const userResult = await get_current_user();
                if (userResult.success) {
                    // Dispatch the user data to Redux
                    dispatch(saveUserData(userResult.data.content));
                } else {
                    console.error(userResult.error);
                }
                navigate("/");
            } else {
                setShowError(true);
            }
        } catch (error) {
            setShowError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[450px] h-[470px] bg-white/20 rounded-[15px] border border-black backdrop-blur-[05px] p-8">
            <div className="text-white w-full">
                <div className="flex items-center mb-6 text-center justify-center mb-4 text-sm">
                    <img src="/login/user-icon.svg" alt="Icon" className="w-8 h-8 pr-[8px]" />
                    <span>User Login</span>
                </div>

                <div className="mb-4 flex">
                    <div className="text-left flex flex-col items-center">
                        <label className="mr-2 h-[33px] items-center mb-4 flex text-sm">Username</label>
                        <label className="mr-2 h-[33px] items-center flex text-sm">Password</label>
                    </div>
                    <div className="flex flex-col w-full">
                        <input 
                            type="text" 
                            className="h-[33px] p-2 border rounded text-black border-gray-300 mb-4 text-sm" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input 
                            type="password" 
                            className="h-[33px] p-2 border rounded text-black border-gray-300" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button 
                            className="w-[40%] bg-blue-500 text-white p-2 rounded mb-2 mt-4"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                </div>
                            ) : (
                                "Login"
                            )}
                        </button>

                        <a href="/forgot-password" className="text-sm text-white-400 block">Forgot password?</a>
                    </div>
                </div>

                {showError && (
                    <div className="text-red-500 text-sm mb-4">
                        Invalid username or password. Please try again.
                    </div>
                )}

                <p className="text-sm">
                    This application is owned and operated by AMPHAM. <br/><br/> 
                    Unauthorized access or use is strictly prohibited and may be subject to legal action.
                    <br/><br/> 
                    By logging in, you agree to abide by our <a href="/terms-of-use" className="font-bold">Terms of Use</a> and 
                    <a href="/privacy-policy" className="font-bold"> Privacy Policy</a>.
                </p>
            </div>
        </div>
    );
};

export default LoginForm;