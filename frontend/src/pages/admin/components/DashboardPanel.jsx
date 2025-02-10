import React, {useState} from 'react';

const DashboardPanel = ({ onSelectSection, selectedSection }) => {

    const [highlightedSection, setHighlightedSection] = useState("profile")

    const sections = [
        { id: 'users-list', label: 'Users' },
        { id: 'user-add', label: 'Add User' },
        { id: 'societies-list', label: 'Societies' },
    ]

    const handleSelect = (id) => {
        setHighlightedSection(id)
        onSelectSection(id)
    }

    return (
        <div className="flex-col settings-sidebar w-full mr-5">

            <div className="flex items-center ms-5 p-4 mt-10 bg-white rounded-lg">
                {/* Circular Image */}
                <img
                    src="https://placekitten.com/150/150"
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                />

                {/* Text on the Right */}
                <div className="ml-2 w-full">
                    <h3 className="w-full text-lg font-semibold">John </h3>
                    {/* <p className="text-gray-600">Software Engineer</p> */}
                </div>
            </div>

            <ul className='ps-5 mt-10 space-y-2'>
                {sections.map((section) => (
                    <li
                        key={section.id}
                        className={`cursor-pointer px-2 py-1 rounded ${highlightedSection === section.id ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
                        onClick={() => handleSelect(section.id)}
                    >
                        {section.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DashboardPanel