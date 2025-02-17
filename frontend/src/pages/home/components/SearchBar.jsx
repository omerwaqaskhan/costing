import React, { useState } from "react";
import { Search } from "lucide-react";
import inactiveButton from "../../../assets/gl-mapping/inactive.svg";
import plusButton from "../../../assets/gl-mapping/plus-button.svg";

const SearchBar = ({ onButtonClick, onSearch, showAddButton }) => {
    const [searchText, setSearchText] = useState("");

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
        if (onSearch) {
            onSearch(value); // Pass the input value to the parent
        }
    };

    const handleButtonClick = (type) => {
        if (onButtonClick) {
            onButtonClick(type); // Pass button type to the parent
        }
    };

    return (
        <div className="relative w-full flex items-center gap-2">
            <div className="relative flex-1">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchText}
                    onChange={handleInputChange}
                    className="w-full h-[31px] pl-2 pr-10 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
            {showAddButton && (
                <button onClick={() => handleButtonClick("plus")}>
                    <img src={plusButton} alt="Plus" className="w-26 h-23" />
                </button>
            )}
            <button onClick={() => handleButtonClick("inactive")}>
                <img src={inactiveButton} alt="Inactive" className="w-82 h-23" />
            </button>
        </div>
    );
};

export default SearchBar;
