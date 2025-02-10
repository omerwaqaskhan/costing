import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AmphamRoutes from "./components/AmphamRoutes";
import AdminAmphamRoutes from "./components/AdminAmphamRoutes.jsx";
import ProtectedRoutesAdmin from "./pages/admin/components/ProtectedRoutesAdmin.jsx";

function App() {
    // Get dark mode preference from localStorage (default to false if not set)
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <BrowserRouter>
            {/* Apply background dynamically */}
            <div className={`w-full h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-[#f6f6f6] text-black"}`}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/*" element={<AmphamRoutes />} />

                    {/* Admin Routes (Protected) */}
                    <Route
                        path="/pp-admin/*"
                        element={
                            <ProtectedRoutesAdmin>
                                <AdminAmphamRoutes />
                            </ProtectedRoutesAdmin>
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
