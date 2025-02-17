import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import UnmappedSection from "./components/UnmappedSection.jsx";
import MappedSection from "./components/MappedSection.jsx";

function Home() {
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        // getNotes()
    }, []);

    // Callback for button clicks
    const handleUnmappedButtonClick = (type) => {
        console.log(`Button unmapped clicked: ${type}`);
    };

    const handleButtonClick = (type) => {
        console.log(`Button clicked: ${type}`);
    };

    // Callback for search input changes
    const handleUnmappedSearch = (text) => {
        setSearchText(text);
        console.log(`Search unmapped input: ${text}`);
    };

    const handleSearch = (text) => {
        setSearchText(text);
        console.log(`Search input: ${text}`);
    };

    return (
        <div className="w-full min-h-screen bg-gray-200 flex flex-col pt-[75px] pb-[100px]">
            <div className="w-full flex flex-grow">
                {/* First component - 40% */}
                <div className="hidden sm:flex flex-[40] bg-green-000">
                    <div className="h-full bg-purple-000 w-full mx-4">
                        <SearchBar onButtonClick={handleUnmappedButtonClick} onSearch={handleUnmappedSearch} showAddButton={true} />
                        <UnmappedSection />
                    </div>
                </div>

                {/* Second component - 60% */}
                <div className="hidden sm:flex flex-[60] bg-blue-000">
                    <div className="h-full bg-purple-000 w-full mx-4">
                        <SearchBar onButtonClick={handleButtonClick} onSearch={handleSearch} />
                        <MappedSection />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
