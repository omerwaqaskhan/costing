import { useState } from "react"
import api from "../../api"
import { useNavigate, Link } from "react-router-dom"
import "../../styles/Form.css"
import LoadingIndicator from "../../components/LoadingIndicator"
import SettingsSidebar from "./components/SettingsSidebar"
import Profile from "./components/Profile"
import ChangePassword from "../ChangePassword"
import Logout from "./components/Logout.jsx";


function UserDashboard() {
    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(false)
    const [selectedSection, setSelectedSection] = useState("profile");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {

        setLoading(true)
        e.preventDefault()

        const formData = new FormData();
        formData.append("email", username);

        try {
            const res = await api.post("auth/forgot-password", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res.status === 200) {
                navigate("/login")
            }

        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    const handleSectionSelect = (id) => {
        setSelectedSection(id) // Update selected section
    }

    return (
        <div className="w-full h-screen bg-white flex flex-col pt-[75px]">

            <div className="w-full h-screen flex">

                {/* left container */}
                <div className="w-1/5 h-screen flex sticky top-[75px] bg-lightGray">

                    <SettingsSidebar selectedSection={selectedSection} onSelectSection={handleSectionSelect} />
                </div>

                {/* middle container */}
                <div className="w-5/6 h-screen flex flex-col mx-auto items-center">

                    {
                        (() => {
                            switch (selectedSection) {

                                case ('profile'): {
                                    return (
                                        <Profile />
                                    )
                                }
                                    break;

                                case ('change-password'): {
                                    return (
                                        <ChangePassword/>
                                    )
                                }
                                    break;

                                case ('logout'): {
                                    return (
                                        <Logout />
                                    )
                                }
                                    break;

                                default: {
                                    return (
                                        <p>404 - NOT FOUND</p>
                                    )
                                }
                                    break;
                            }
                        })()
                    }

                </div>

                {/* right container */}
                <div className="w-1/5 h-screen flex sticky top-[75px]">

                </div>

            </div>

        </div>
    )
}

export default UserDashboard