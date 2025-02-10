import React, { useState } from "react";
import Form from "../../components/Form"
import { Link } from 'react-router-dom'


function Login() {
    return (
        // <div className="pt-[75px] flex flex-col items-center w-full">
        //     <div className="flex-col items-center w-full">
        //         <Form route="auth/token" method="login" />
        //     </div>
        //     <div className="flex items-center">
        //         <p className="text-gray-500 text-[18px]">Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register Here</Link> </p>
        //     </div>
        // </div>

        <div className="flex h-screen">
            {/* Left Column */}
            <div className="w-2/3 flex flex-col items-center justify-center bg-gray-100 p-10">
                <img src="/logo.png" alt="Logo" className="w-32 mb-6" />
                <Form />
            </div>

            {/* Right Column */}
            <div className="w-1/3 flex flex-col items-center justify-center p-10">
                <Form />
            </div>
        </div>
    ) 
    
}

export default Login

