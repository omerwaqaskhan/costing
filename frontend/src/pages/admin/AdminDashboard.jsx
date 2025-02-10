import {useState} from "react"
import "../../styles/Form.css"
import LoadingIndicator from "../../components/LoadingIndicator"
import DashboardPanel from "./components/DashboardPanel.jsx"
import UsersList from "./components/UsersList.jsx"
import UserEdit from "./components/UserEdit.jsx";
import AdminLogin from "./components/AdminLogin.jsx"


function AdminDashboard() {
    const [loading, setLoading] = useState(false)
    const [selectedSection, setSelectedSection] = useState("profile");
    const [selectedUserId, setSelectedUserId] = useState(null);


    const handleSectionSelect = (id) => {
        setSelectedSection(id);
    };

    // Function to handle user edit selection
    const handleEditUser = (userId) => {
        setSelectedUserId(userId);
        setSelectedSection("edit-user")
    };

    const handleBackToUserList = () => {
        setSelectedUserId(null);  // Reset to show user list again
    };

    return (
        <div className="w-full h-screen bg-white flex flex-col pt-[75px]">
            <div className="w-full flex flex-1">
                {/* left container */}
                <div className="w-1/5 h-screen flex sticky top-[75px] bg-lightGray">
                    <DashboardPanel selectedSection={selectedSection} onSelectSection={handleSectionSelect}/>
                </div>

                {/* middle container */}
                <div className="w-5/6 flex flex-col flex-1">
                    {
                        (() => {
                            switch (selectedSection) {
                                case ('users-list'): {
                                    return (
                                        <UsersList onEditUser={handleEditUser}/> // Pass the handleEditUser function
                                    );
                                }
                                case ('edit-user'): {
                                    return (
                                        <UserEdit userId={selectedUserId}/> // Pass the selected userId to edit
                                    );
                                }
                                default: {
                                    return (
                                        <p>Default</p>
                                    );
                                }
                            }
                        })()
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
