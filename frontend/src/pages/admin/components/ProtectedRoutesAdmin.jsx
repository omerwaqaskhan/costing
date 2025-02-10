import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";  // Assuming you're using Redux for state management
import store from "../../../redux/store";

const ProtectedRoutesAdmin = ({ children }) => {
  const {userData} = store.getState().user
  // Check if the user has the required role (admin or staff)
  if (!userData || (userData.role !== "admin")) {
    return <Navigate to="/login" />; // Redirect to login if not an admin
  }

  return children;  // Render the child components if the user is authorized
};

export default ProtectedRoutesAdmin;
