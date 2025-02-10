import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "../pages/login/Login.jsx"
import Register from "../pages/Register"
import NotFound from "../pages/NotFound"
import Home from "../pages/home/Home.jsx"
import ChangePassword from "../pages/ChangePassword"
import ProtectedRoute from "../components/ProtectedRoutes"
import ForgotPassword from "../pages/ForgotPassword"
import ResetPassword from "../pages/ResetPassword"
import VerifyForgotPasswordToken from "../pages/VerifyForgotPasswordToken"
import UserDashboard from "../pages/user-settings/UserDashboard"
import VerifyEmail from "../pages/VerifyEmail.jsx";
import Topbar from "./Topbar.jsx";
import Notifications from "../pages/Notifications.jsx";


function Logout() {
    localStorage.clear()
    return <Navigate to="/login" />
}

function LogoutAndRegister() {
    localStorage.clear()
    return <Register />
}

function AmphamRoutes() {

    return (
        <>
            {/* <Topbar/> */}
           <Routes>
            <Route path="/" element={
                <Login />
            }
            />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<LogoutAndRegister />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/verify-forgot-password-token/:token" element={<VerifyForgotPasswordToken />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/change-password" element={
                <ProtectedRoute>
                    <ChangePassword />
                </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
        </Routes>
        </>
    )
}

export default AmphamRoutes