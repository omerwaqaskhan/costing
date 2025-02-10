import React from 'react'
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../constants"
import "../../../styles/Form.css"
import { useNavigate } from 'react-router-dom';
import AuthUtils from "../../../utils/AuthUtils.js";
import {clearUserData} from "../../../redux/userSlice"
import {useDispatch} from "react-redux"


function Logout() {

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const handleLogout = () => {
        AuthUtils.logout(); // This should clear tokens
        dispatch(clearUserData())
        navigate('/'); // Redirect to the homepage
    };

    return (
        <div className="w-full h-full flex flex-col items-center pt-10 ">
            <h1 className="text-[30px] mb-[10px] pt-10">LOGOUT</h1>
            <h2 className="text-[20px] pt-3">Are you sure you want to logout?</h2>
            <div className="flex pt-[75px]">
                <button
                    className="btn btn-primary bg-blue-600 py-3 px-10 text-cyan-50 text-[20px] rounded-[5px]"
                    onClick={handleLogout}>
                    YES
                </button>
            </div>
        </div>
    )
}

export  default Logout