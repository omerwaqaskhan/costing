import { useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import DropdownMenu from "./DropdownMenu";

const NavItem = ({ title, menuItems, openDropdown, setOpenDropdown, setNav, mobile }) => {
    const isOpen = openDropdown === title;
    const itemRef = useRef();

    const handleClick = () => {
        setOpenDropdown(title);
    };

    return (
        <div ref={itemRef} className="relative">
            <button className="flex items-center gap-2 px-4 py-2 hover:text-blue-400" onClick={handleClick}>
                {title}
                <FaChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && (
                <DropdownMenu
                    menuItems={menuItems}
                    mobile={mobile}
                    onItemClick={() => {
                        if (mobile) setNav(false); // Close mobile menu on item click
                    }}
                />
            )}
        </div>
    );
};

export default NavItem;
