import { useEffect, useState } from "react"
import "../../styles/Home.css"

function Home() {

    useEffect(() => {
        // getNotes()
    }, [])

    return (
        <div className="w-full h-full bg-white flex flex-col pt-[75px]">
            <div className="w-full h-full flex">
                {/* first component */}
                <div className="hidden sm:flex w-3/6 h-screen sticky top-[75px] bg-green-400">
                </div>            
                
                {/* second component */}
                <div className="w-3/6 min-h-screen flex flex-col pt-4 mx-auto bg-blue-400">
                </div>
            </div>
        </div>
    )
}

export default Home