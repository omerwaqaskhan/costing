import React from "react";
import UnmappedTable from "./MappedTable";

const MappedSection = () => {
    return (
        <div className="w-full h-[650px] bg-white border-[0.5px] border-solid border-[#dbd3d3] shadow-[2px_2px_2px_#00000040] mt-5">
            <UnmappedTable />
        </div>
    );
};

export default MappedSection