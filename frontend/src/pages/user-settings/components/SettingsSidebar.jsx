import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux"
import ImageUploadModal from "../../../components/ImageUploadModal.jsx";
import {get_current_user} from "../../../api.js";
import {saveUserData} from "../../../redux/userSlice.js";


const SettingsSidebar = ({ onSelectSection, selectedSection }) => {

    const [isProfileModalOpen, setProfileModalOpen] = useState(false);
    const [highlightedSection, setHighlightedSection] = useState("profile")

    const userData = useSelector((state) => state.user.userData)
    const dispatch = useDispatch()

    const openProfileUploadModal = () => {
        console.log('Click');
        setProfileModalOpen(true);
    }

    const closeModal = () => {
        setProfileModalOpen(false);
    };

    const handleImageUpload = (newImageUrl) => {
        // setImageUrl(newImageUrl);  // Update the state with the new image URL
        get_current_user().then((result) => {
                if (result.success) {
                    dispatch(saveUserData(result.data))  // Save data to Redux
                } else {
                    console.error("Error on Get Current User: ", result.error);
                }
            })
        closeModal();  // Optionally close the modal after upload
    };

    const sections = [
        { id: 'profile', label: 'Profile Settings' },
        { id: 'change-password', label: 'Change Password' },
        { id: 'logout', label: 'Logout' },
    ]

    const handleSelect = (id) => {
        setHighlightedSection(id)
        onSelectSection(id)
    }

    return (
        <div className="flex-col settings-sidebar w-full mr-5">

        </div>
    );
};

export default SettingsSidebar