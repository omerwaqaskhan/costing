import React, {useState} from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx"
import { FaTimes } from "react-icons/fa"
import ProtectedRoute from "./ProtectedRoutes";


function Navbar() {

    const [nav, setNav] = useState(false)

    const handleClick = () => setNav(!nav)

    return(
        <nav className="flex justify-center p-5 items-center">
            {/* <h1 className="text-3xl">Logo</h1> */}
            <ul className="hidden md:flex gap-6 text-white">
                <Link to='/'><li className="hover:text-green-500">HOME</li></Link>
                {/* <Link to='/login'><li>Login</li></Link>
                <Link to='/register'><li>Register</li></Link>
                <Link to='/change-password'><li>Change Password</li></Link> */}
            </ul>
            <div className="md:hidden z-10" onClick={handleClick}>
                {nav ? <FaTimes size={25} color="white"/> : <RxHamburgerMenu size={28} color="white"/>}
            </div>
            <ul className={`${
                nav 
                ? 'text-white opacity-100 transform translate-x-0'
                : 'opacity-0 transform -translate-y-full'} 
                transition-transform absolute top-0 left-0 w-full h-screen bg-zinc-800/80 flex
                flex-col justify-center items-center text-2xl
                `} 
                onClick={() => setNav(false)}>
                <Link to='/'><li  className="p-2 hover:text-teal-800 hover:text-lightgreen-500">HOME</li></Link>
                {/* <Link to='/login'><li className="p-2 hover:text-teal-800">Login</li></Link>
                <Link to='/register'><li className="p-2 hover:text-teal-800">Register</li></Link>
                <Link to='/change-password'><li className="p-2 hover:text-teal-800">Change Password</li></Link> */}
            </ul>
            
        </nav>
    )
}

export default Navbar