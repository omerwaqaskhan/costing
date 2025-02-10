import api from "./api";
import store from "../src/redux/store";


const checkAdminRole = () => {
  const { userData } = store.getState().user;  // Access Redux store

  if (!userData || (userData.role !== "admin" && userData.role !== "staff")) {
    throw new Error("Access denied. Only admin or staff can access this.");
  }
};

// Fetch all users
export const getUsers = async () => {
  checkAdminRole();
  const response = await api.get("/admin/admin-users/users");
  return response.data;
};

// Fetch a single user by ID
export const getUser = async (id) => {
  checkAdminRole();
  const response = await api.get(`/admin/admin-users/users/${id}`);
  return response.data;
};

// Update a user by ID
export const updateUser = async (id, data) => {
  checkAdminRole();
  const response = await api.put(`/admin/admin-users/users/${id}`, data);
  return response.data;
};

// Delete a user by ID
export const deleteUser = async (id) => {
  checkAdminRole();
  await api.delete(`/admin/admin-users/users/${id}`);
};
