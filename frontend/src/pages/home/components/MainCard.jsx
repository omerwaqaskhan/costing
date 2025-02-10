import { Link } from "react-router-dom";

function MainCard({ imageUrl, overlayText, linkTo }) {
    return (
        <Link to={linkTo} className="w-[260px] h-[300px] relative block">
            {/* Background Image */}
            <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${imageUrl})` }}
            >
                {/* Overlay */}
                <div className="absolute bottom-0 w-full bg-black bg-opacity-30 items-center">
                    <p className="text-white text-center break-words whitespace-normal w-full px-2 py-2">
                        {overlayText}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default MainCard;
