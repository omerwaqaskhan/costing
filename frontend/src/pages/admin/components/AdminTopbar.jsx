import React, {useRef} from 'react'
import { FaFacebook, FaInstagram, FaBell, FaUserAlt } from 'react-icons/fa'
import AuthUtils from '../../../utils/AuthUtils'
import { Link, useNavigate } from 'react-router-dom'
import logoUrl from '../../../assets/icon.png'
// import Navbar from './Navbar'

function AdminTopbar() {

    const navigate = useNavigate()

    const username = AuthUtils.isAuthenticated() ? 'John Doe' : ''

    const toast = useRef(null)

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Message Content', life: 3000 })
    };

    const handleAuthClick = () => {

        if (AuthUtils.isAuthenticated()) {
            navigate('/user-dashboard')
        } else {
            navigate('/login')
            // navigate('/user-dashboard')
        }
    };

    return (
        <div className="w-full h-[75px] bg-gray-900 flex items-center justify-between px-8 fixed top-0 z-50">

            <div>
                <img src={logoUrl} alt="Logo" className="h-full max-h-[75px]" />
            </div>

            {/*<Navbar/>*/}


            {/* Icons */}
            <div className="flex items-center space-x-6">
                {/* <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="text-white text-2xl hover:text-blue-500 transition duration-300" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-white text-2xl hover:text-pink-500 transition duration-300" />
                </a> */}
                <a href="/notifications">
                    <FaBell className="text-white text-2xl hover:text-green-500 transition duration-300" />
                </a>
                <button onClick={handleAuthClick} className="flex items-end">
                    {
                        username ?
                        <FaUserAlt className="text-white text-2xl hover:text-green-500 transition duration-300" />
                        :
                        <FaUserAlt className="text-white text-2xl hover:text-red-500 transition duration-300" />
                    }
                    {/* <FaUserAlt className="text-white text-2xl hover:text-green-500 transition duration-300" />
                    {username && <span className="ml-2 text-white text-sm bg-blue-400 p2 flex items-end">{username}</span>} */}
                </button>
            </div>
        </div>
    )
}

export default AdminTopbar;
