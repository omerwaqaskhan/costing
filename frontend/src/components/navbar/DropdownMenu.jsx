import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const DropdownMenu = ({ menuItems, mobile, onItemClick }) => {
    const navigate = useNavigate();

    const handleItemClick = (item) => {
        onItemClick(); // Close dropdown
        
        const routes = {
            "Calculation Config": "/calculation-config",
            "Pre Calculation Checks": "/pre-calculation-checks",
            "Run Calculation": "/run-calculation",
            "General Ledger GL": "/general-ledger-gl",
            "GL Mapping": "/gl-mapping", // Corrected typo
            "Reclass Rules": "/reclass-rules",
            "Cost Definition Mapping": "/cost-definition-mapping",
            "Overhead Allocation": "/overhead-allocation",
            "Monthly": "/reports/monthly",
            "Yearly": "/reports/yearly"
        };

        // Navigate to the correct page
        if (routes[item]) {
            setTimeout(() => {
                // <Link to={routes[item]}><li>Calculate Config</li></Link>
                navigate(routes[item]);
            }, 0);
        }
    
        onItemClick();
    };

    return (
        <div className={`absolute ${mobile ? "relative text-center" : "left-0"} mt-2 w-48 bg-white text-black rounded shadow-lg`}>
            {menuItems.map((item, index) => (
                <button 
                    key={index} 
                    className="block w-full text-left px-4 py-2 hover:bg-blue-300"
                    onClick={() => handleItemClick(item)}
                >
                    {item}
                </button>
            ))}
        </div>
    );
};

export default DropdownMenu;
