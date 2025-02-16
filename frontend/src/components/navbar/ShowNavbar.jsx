import React, { Children, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


const ShowNavbar = ({children}) => {
    const location = useLocation()
    const [showNavbar, setShowNavbar] = useState(false)

    useEffect(
        () => {
            console.log("location is: ", location)
            if (location.pathname == '/'){
                setShowNavbar(false)
            }
            else {
                setShowNavbar(true)
            }
    }, [location])

    return(
        <div>{showNavbar && children}</div>
    )
}

export default ShowNavbar