import React, {useRef} from 'react'
import { FaFacebook, FaInstagram, FaBell, FaUserAlt } from 'react-icons/fa'
import AuthUtils from '../utils/AuthUtils'
import { Link, useNavigate } from 'react-router-dom'
import logoUrl from '../assets/topbar/topbar-logo.svg';
import userUrl from '../assets/topbar/user.svg';
import notifUrl from '../assets/topbar/notification.svg';
import settingUrl from '../assets/topbar/setting.svg';
import queUrl from '../assets/topbar/question-mark.svg';
import modeUrl from '../assets/topbar/mode.svg';
import Navbar from './navbar/Navbar'

function Topbar() {

    const navigate = useNavigate()

    // const username = AuthUtils.isAuthenticated() ? 'John Doe' : ''
    // const toast = useRef(null)
    // const showSuccess = () => {
    //     toast.current.show({ severity: 'success', summary: 'Success', detail: 'Message Content', life: 3000 })
    // };
    // const handleAuthClick = () => {
    //     if (AuthUtils.isAuthenticated()) {
    //         navigate('/user-dashboard')
    //     } else {
    //         navigate('/login')
    //         // navigate('/user-dashboard')
    //     }
    // };

    return (
        <div className="w-full h-[37px] bg-gray-900 flex items-center justify-between fixed top-0 z-50">
            
            <button onClick={() => navigate('/')} className="focus:outline-none">
                <img src={logoUrl} alt="Ampham" className="h-full max-h-[37px]" />
            </button>

            <Navbar/>

            <div className="flex items-center space-x-4">
                <button onClick={() => navigate('/')} className="focus:outline-none">
                    <img src={queUrl} alt="Question" className="h-[19px] w-[19px]" />
                </button>
                <button onClick={() => navigate('/')} className="focus:outline-none">
                    <img src={modeUrl} alt="Mode" className="h-[19px] w-[19px]" />
                </button>
                <button onClick={() => navigate('/')} className="focus:outline-none">
                    <img src={notifUrl} alt="Notifications" className="h-[19px] w-[19px]" />
                </button>
                <button onClick={() => navigate('/')} className="focus:outline-none">
                    <img src={settingUrl} alt="Settings" className="h-[19px] w-[19px]" />
                </button>
                <button onClick={() => navigate('/')} className="focus:outline-none pr-[17px]">
                    <img src={userUrl} alt="User" className="h-[19px] w-[19px]" />
                </button>
            </div>
        </div>
    )
}

export default Topbar;