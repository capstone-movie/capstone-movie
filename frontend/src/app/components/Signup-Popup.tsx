"use client";
import React, {useState, useEffect} from "react";

const SignupPopup = ({closePopup}: { closePopup: () => void }) => {
    const [isVisible, setIsVisible] = useState(true); // Popup visibility
    const [email, setEmail] = useState(""); // Stores the email
    const [showCheckEmail, setShowCheckEmail] = useState(false); // Confirmation popup

    /* User clicks the subscribe */
    const handleSignup = () => {
        if (email.trim() !== "") {
            setShowCheckEmail(true);
        }
    };

    /* "NoThanks" press */
    const handleNoThanks = () => {
        setIsVisible(false);
        closePopup(); // Close the popup when the user chooses "No Thanks"
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
                    <h2 className="text-2xl font-bold">Welcome to AniRec</h2>

                    {showCheckEmail ? (
                        <>
                            <p className="mt-2">Check your email to continue</p>
                            <p className="text-gray-500 mt-1">({email})</p>
                        </>
                    ) : (
                        <>
                            <form>
                                <p className="text-xl mt-6">Sign up</p>
                                <label className={'float-left'}>Email</label>
                                <input
                                    autoComplete='email'
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="my-2 w-full p-2 border rounded-md text-black bg-white"
                                />
                                <label className={'float-left'}>Password</label>
                                <input
                                    autoComplete={'new-password'}
                                    name='profilePassword'
                                    placeholder="Create a password"
                                    id="profilePassword"
                                    type="password"
                                    className="mt-2 w-full p-2 border rounded-md text-black bg-white"
                                />
                                <button
                                    className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                                    onClick={handleSignup}
                                >
                                    Sign up
                                </button>
                            </form>
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
