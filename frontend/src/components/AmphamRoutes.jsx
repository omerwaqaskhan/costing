import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, matchPath } from "react-router-dom";
import Login from "../pages/login/Login.jsx";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/Home.jsx";
import ChangePassword from "../pages/ChangePassword";
import ProtectedRoute from "../components/ProtectedRoutes";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import VerifyForgotPasswordToken from "../pages/VerifyForgotPasswordToken";
import UserDashboard from "../pages/user-settings/UserDashboard";
import VerifyEmail from "../pages/VerifyEmail.jsx";
import Topbar from "./Topbar.jsx";
import Notifications from "../pages/Notifications.jsx";
import ShowNavbar from "../components/navbar/ShowNavbar.jsx";

const SESSION_TIMEOUT = 15 * 60 * 1000;

function isSessionValid() {
    const lastActivity = localStorage.getItem("lastActivity");
    const token = localStorage.getItem("access");

    if (!token || !lastActivity) return false;

    const elapsedTime = Date.now() - parseInt(lastActivity, 10);
    return elapsedTime < SESSION_TIMEOUT;
}

function Logout() {
    localStorage.clear();
    return <Navigate to="/login" replace />;
}

function LogoutAndRegister() {
    localStorage.clear();
    return <Register />;
}

function AmphamRoutes() {
    const location = useLocation();

    // Update last activity on navigation
    React.useEffect(() => {
        localStorage.setItem("lastActivity", Date.now().toString());
    }, [location.pathname]);

    const hideTopbarRoutes = ["/login"];
    const shouldHideTopbar = hideTopbarRoutes.some((route) =>
        matchPath({ path: route, end: true }, location.pathname)
    );

    return (
        <>
            {!shouldHideTopbar && <Topbar />}

            {/* <ShowNavbar>
                <Topbar />
            </ShowNavbar> */}

            <Routes>
                {/* <Route path="/" element={<Login />} /> */}
                <Route path="/" element={isSessionValid() ? <Home /> : <Logout />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/login" element={<Login />} />
                {/* <Route path="/profile" element={<Login />} /> */}
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<LogoutAndRegister />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify-email/:token" element={<VerifyEmail />} />
                <Route path="/verify-forgot-password-token/:token" element={<VerifyForgotPasswordToken />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route
                    path="/change-password"
                    element={
                        <ProtectedRoute>
                            <ChangePassword />
                        </ProtectedRoute>
                    }
                />
                <Route path="/calculation-config" element={<NotFound />} />
                <Route path="/pre-calculation-checks" element={<NotFound />} />
                <Route path="/run-calculation" element={<NotFound />} />
                <Route path="/general-ledger-gl" element={<NotFound />} />
                <Route path="/gl-apping" element={<NotFound />} />
                <Route path="/reclass-rules" element={<NotFound />} />
                <Route path="/cost-definition-mapping" element={<NotFound />} />
                <Route path="/overhead-allocation" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default AmphamRoutes;