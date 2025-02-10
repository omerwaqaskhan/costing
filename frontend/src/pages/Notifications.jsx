import { useEffect, useState } from "react"
import logoUrl from '../assets/icon.png'


function Notifications() {

    useEffect(() => {

    }, [])

    return (
        <div className="w-full h-full bg-white flex flex-col pt-[75px]">

            <div className="w-full h-full flex">

                {/* left container */}
                <div className="w-1/5 h-[300px] flex sticky top-[75px]">

                </div>

                {/* middle container */}
                <div className="w-5/6 h-screen flex flex-col mx-auto items-center">

                    {/* Cards container */}
                    {/* <div className="w-full h-full flex justify-between px-4 pt-4">
                    </div> */}

                    <img src={logoUrl} alt="Logo" className="h-full max-h-[300px] max-w-[300px]" />
                    <h1 className="text-[54px]">NOTIFICATIONS</h1>
                    <h1 className="text-[24px]"> Under Development!</h1>

                </div>

                {/* right container */}
                <div className="w-1/5 h-[300px] flex sticky top-[75px]">

                </div>

            </div>

        </div>
    )
}

export default Notifications