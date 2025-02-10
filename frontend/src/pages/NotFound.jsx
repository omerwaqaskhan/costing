import React, { useEffect, useState } from "react"


function NotFound() {

    useEffect(() => {

    }, [])

    return (
        <div className="w-full h-full bg-white flex flex-col pt-[75px] items-center">
            <img src={logoUrl} alt="Logo" className="h-full max-h-[300px] max-w-[300px]" />
            <h1>404</h1>
            <h1>Page Not Found!</h1>
        </div>
    )
}

export default NotFound