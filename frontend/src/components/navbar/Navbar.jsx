import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";
import NavItem from "./NavItem";

function Navbar() {
    const navRef = useRef();
    const [nav, setNav] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleDropdown = (title) => {
        setOpenDropdown(openDropdown === title ? null : title);
    };

    return (
        <nav ref={navRef} className="flex justify-between items-center text-white relative h-[37px] text-[15px]">
            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-2">
                <NavItem title="Calculate" menuItems={["Calculation Config", "Pre Calculation Checks" , "Run Calculation"]} openDropdown={openDropdown} setOpenDropdown={handleDropdown} />
                <NavItem title="Finance Config" menuItems={["General Ledger GL", "GL Mapping", "Reclass Rules", "Cost Definition Mapping", "Overhead Allocation"]} openDropdown={openDropdown} setOpenDropdown={handleDropdown} />
                <NavItem title="Product Config" />
                <NavItem title="Data Center" />
                <NavItem title="Reports" />
            </ul>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden z-10" onClick={() => setNav(!nav)}>
                {nav ? <FaTimes size={25} color="white" /> : <RxHamburgerMenu size={28} color="white" />}
            </div>

            {/* Mobile Menu */}
            {nav && (
                <ul className="absolute top-0 left-0 w-full h-screen bg-gray-900/90 flex flex-col justify-center items-center text-2xl">
                    <NavItem title="Calculate" menuItems={["Calculation Config", "Pre Calculation Checks" , "Run Calculation"]} openDropdown={openDropdown} setOpenDropdown={handleDropdown} setNav={setNav} mobile />
                    <NavItem title="Finance Config" menuItems={["General Ledger GL", "GL Mapping", "Reclass Rules", "Cost Definition Mapping", "Overhead Allocation"]} openDropdown={openDropdown} setOpenDropdown={handleDropdown} setNav={setNav} mobile />
                    <NavItem title="Product Config" setNav={setNav} mobile />
                    <NavItem title="Data Center" setNav={setNav} mobile />
                    <NavItem title="Reports" setNav={setNav} mobile />
                </ul>
            )}
        </nav>
    );
}

export default Navbar;
