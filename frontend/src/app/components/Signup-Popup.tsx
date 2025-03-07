"use client";
import React, { useState, useEffect } from "react";

const SignupPopup = ({ closePopup }: { closePopup: () => void }) => {
    const [isVisible, setIsVisible] = useState(true); // Popup visibility
    const [email, setEmail] = useState(""); // Stores the email
    const [showCheckEmail, setShowCheckEmail] = useState(false); // Confirmation popup

    /* User clicks the subscribe */
    const handleSubscribe = () => {
        if (email.trim() !== "") {
            setShowCheckEmail(true);
        }
    };

    /* "NoThanks" press */
    const handleNoThanks = () => {
        setIsVisible(false);
        closePopup(); // Close the popup when the user chooses "No Thanks"
    };

    /* "Enter" press */
    const enterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSubscribe();
        }
    };

    /* Close popup when clicking anywhere after confirmation appears */
    useEffect(() => {
        if (showCheckEmail) {
            const closeOnClick = () => {
                setIsVisible(false);
                closePopup(); // Close the popup after confirmation
            };
            document.addEventListener("click", closeOnClick);

            return () => {
                document.removeEventListener("click", closeOnClick);
            };
        }
    }, [showCheckEmail]);

    /* If popup is hidden, removes the popup */
    if (!isVisible) return null;

    return (
        <>
            {/* Blurred background */}
            <div
                className="w-full h-full fixed top-0 left-0 pointer-events-auto bg-black/50 backdrop-blur z-10"
                onClick={closePopup} // Close the popup when the background is clicked
            />

            <div className="fixed inset-0 flex items-center justify-center text-white z-20">
                <div className="bg-bgcolor p-8 w-96 text-center shadow-lg rounded-md relative">
                    {/* Close Button (X) */}
                    <button
                        onClick={handleNoThanks}
                        className="absolute right-3 top-3 text-white text-2xl"
                    >
                        ✖
                    </button>
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
                                className="mt-4 w-full p-2 border rounded-md text-black bg-white"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={enterPress}
                            />

                            <button
                                className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                                onClick={handleSubscribe}
                            >
                                Subscribe
                            </button>
                            <button
                                className="mt-4 text-sm text-gray-400 hover:underline"
                                onClick={handleNoThanks}
                            >
                                No Thanks
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
export default SignupPopup;
