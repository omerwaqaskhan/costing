import { useEffect, useState } from "react"
import api from "../../api.js"
import "../../styles/Home.css"
import MainCard from "./components/MainCard.jsx"
import CardsSection from "./components/CardsSection.jsx";
import RewardCard from "./components/RewardCard.jsx";


function Home() {

    useEffect(() => {
        // getNotes()
    }, [])

    return (
        <div className="w-full h-full bg-white flex flex-col pt-[75px]">

            <div className="w-full h-full flex">

                {/* first component */}
                <div className="hidden sm:flex w-1/5 h-screen sticky top-[75px]">

                </div>            
                
                {/* second component */}
                <div className="w-5/6 min-h-screen flex flex-col pt-4 mx-auto">
                    {/* Navbar at the top */}
                    {/* <Navbar /> */}

                    <div className="flex-grow flex flex-col p-4 space-y-5 mb-[100px]">
                        <CardsSection />
                        <RewardCard />
                        <RewardCard />
                    </div>

                    <RewardCard/>

                </div>

                {/* thrid component */}
                <div className="hidden sm:flex w-1/5 h-screen sticky top-[75px]">
                
                </div>
            
            </div>

        </div>
    )
}

export default Home