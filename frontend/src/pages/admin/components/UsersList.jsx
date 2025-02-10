import { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../../../admin-api.js";

function UsersList({ onEditUser }) {  // Receive onEditUser as a prop
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Failed to fetch users", error);
      setUsers([]);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      fetchUsers();  // Re-fetch users after deletion
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Page Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        </div>
      </header>

      {/* Page Content */}
      <main className="w-full mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => onEditUser(user.id)}  // Call onEditUser when "Edit" is clicked
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="ml-4 text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default UsersList;




// import { useState, useEffect } from "react";
// import { getUsers, deleteUser } from "../../../admin-api.js";
// import { useNavigate } from "react-router-dom";
//
// function UserList() {
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();
//
//   useEffect(() => {
//     fetchUsers();
//   }, []);
//
//   const fetchUsers = async () => {
//     try {
//       const response = await getUsers();
//       setUsers(Array.isArray(response) ? response : []);
//     } catch (error) {
//       console.error("Failed to fetch users", error);
//       setUsers([]);
//     }
//   };
//
//   const handleDelete = async (userId) => {
//     try {
//       await deleteUser(userId);
//       fetchUsers();
//     } catch (error) {
//       console.error("Failed to delete user", error);
//     }
//   };
//
//   return (
//     <div className="w-full min-h-screen bg-gray-100">
//       {/* Page Header */}
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
//         </div>
//       </header>
//
//       {/* Page Content */}
//       <main className="w-full mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Email
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Role
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {users.length > 0 ? (
//                 users.map((user) => (
//                   <tr key={user.id}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {user.email}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {user.role}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <button
//                         onClick={() => navigate(`/edit-user/${user.id}`)}
//                         className="text-indigo-600 hover:text-indigo-900"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(user.id)}
//                         className="ml-4 text-red-600 hover:text-red-900"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
//                     No users found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }
//
// export default UserList;
