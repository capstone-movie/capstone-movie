"use client";
import React, { useState } from "react";

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
    /* if popup is hidden, removes the popup  */
    if (!isVisible) return null

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 w-96 text-center shadow-lg">
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
                                className="mt-4 w-full p-2 border rounded-md"
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
