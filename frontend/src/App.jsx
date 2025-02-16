import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AmphamRoutes from "./components/AmphamRoutes";

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
            <div className={`w-full h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-[#f6f6f6] text-black"}`}>
                <Routes>
                    <Route path="/*" element={<AmphamRoutes />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
