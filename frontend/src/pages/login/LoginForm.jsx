import React from 'react';

const LoginForm = () => {
    return (
        <div class="w-[450px] h-[470px] bg-white/20 rounded-[15px] border border-black backdrop-blur-[05px] p-8">
            <div className="text-white w-full ">
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
                        
                        <input type="text" className="h-[33px] p-2 border rounded text-white border-gray-300 mb-4 text-sm" />
                        <input type="password" className="h-[33px] p-2 border rounded text-white border-gray-300" />
                        <button className="w-[40%] bg-blue-500 text-white p-2 rounded mb-2 mt-4">Login</button>

                        <a href="/forgot-password" className="text-sm text-white-400 block">Forgot password?</a>
                    </div>
                </div>

                <p className="text-sm">This application is owned and operated by AMPHAM <br/><br/> 
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

/*
<div className="w-full ">
    <div className="flex items-center mb-6 text-center justify-center">
        <img src="/login/user-icon.svg" alt="Icon" className="w-8 h-8 pr-[5px]" />
        <span>User Login</span>
    </div>

    <div className="mb-4 flex">
        <div className="text-left flex flex-col">
            <label className="mb-4">Username</label>
            <label>Password</label>
        </div>
        <div className="flex flex-col w-full justify-between">
            <input type="text" className="h-[33px] p-2 border rounded bg-transparent text-white border-gray-300 mb-4" />
            <input type="password" className="h-[33px] p-2 border rounded bg-transparent text-white border-gray-300" />
            <button className="bg-blue-500 text-white p-2 rounded mb-2 mt-4">Login</button>

            <a href="/forgot-password" className="text-sm text-blue-400 block mt-4">Forgot password?</a>
        </div>
    </div>

    <p className="text-sm">Don't have an account? <a href="/signup" className="text-blue-400">Sign up</a></p>
</div>
*/