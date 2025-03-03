"use client";
import React, { useState, useEffect } from "react";

const SignupPopup = () => {
    const [isVisible, setIsVisible] = useState(true)          //popup-visibility
    const [email, setEmail] = useState("")              //stores the email
    const [showCheckEmail, setShowCheckEmail] = useState(false)         //confirmation popup

    /* user clicks the subscribe */
    const handleSubscribe = () => {
        if (email.trim() !== "") {
            setShowCheckEmail(true)
        }
    }
    /* "NoThanks" press*/
    const handleNoThanks = () => {
        setIsVisible(false)
    }
    /* "Enter" press */
    const enterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSubscribe()
        }
    }
    /* Close popup when clicking anywhere after confirmation appears */
    useEffect(() => {
        if (showCheckEmail) {
            const closeOnClick = () => {
                setIsVisible(false);
            };
            document.addEventListener("click", closeOnClick);

            return () => {
                document.removeEventListener("click", closeOnClick);
            };
        }
    }, [showCheckEmail]);
    /* if popup is hidden, removes the popup  */
    if (!isVisible) return null

    return (
        <>
            {/* Blurred background */}
            <div className="w-full h-full fixed top-0 left-0 pointer-events-none bg-black/50 backdrop-blur" />

            <div className="fixed inset-0 flex items-center justify-center text-white">
                <div className="bg-bgcolor p-8 w-96 text-center shadow-lg rounded-md">
                    {showCheckEmail ? (
                        <>
                            <h2 className="text-xl font-bold">Welcome to AniRec</h2>
                            <p className="mt-2">Check your email to continue</p>
                            <p className="text-gray-500 mt-1">({email})</p>
                        </>
                    ) : (
                        <>
                            <h2 className="text-xl font-bold">Welcome to AniRec</h2>
                            <p className="mt-6">Subscribe to stay up to date!</p>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="mt-4 w-full p-2 border rounded-md text-black"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={enterPress}/>

                            <button className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" onClick={handleSubscribe}>
                                Subscribe
                            </button>
                            <button className="mt-4 text-sm text-gray-400 hover:underline" onClick={handleNoThanks}>
                                No Thanks
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
export default SignupPopup
