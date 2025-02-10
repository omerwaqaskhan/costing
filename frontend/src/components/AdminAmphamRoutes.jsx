import React from "react"
import {Routes, Route} from "react-router-dom"
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import AdminTopbar from "../pages/admin/components/AdminTopbar.jsx";


function AdminAmphamRoutes() {

    return (
        <>
            <AdminTopbar/>
            <Routes>
                <Route path="/" element={<AdminDashboard/>} />
            </Routes>
        </>

    )
}

export default AdminAmphamRoutes