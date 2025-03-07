'use client';
import React, { useState } from 'react';
import Link from "next/link";
import SignupPopup from "@/app/components/Signup-Popup";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSignupPopupVisible, setIsSignupPopupVisible] = useState(false); // State to control Signup Popup visibility

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    // Show Signup Popup
    const showSignupPopup = () => {
        setIsSignupPopupVisible(true); // Show the popup when the button is clicked
    };

    return (
        <>
            <nav className="w-full bg-fhcolor/90 backdrop-blur-xs text-white flex justify-between items-center p-4 sticky top-0 z-20 border-b-[1px] border-[#9994]">
                {/* Hamburger Menu */}
                <button onClick={toggleMenu}
                        className="block text-white">
                    <svg className="w-6 h-6"
                         fill="none"
                         stroke="currentColor"
                         viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
                {/* Title */}
                <Link href="/" onClick={closeMenu}>
                    <h1 className="text-2xl font-bold ml-2">AniRection</h1>
                </Link>
                {/* Links */}
                <div className="hidden 500:flex space-x-6 ml-4">
                    <Link href={{ pathname: "/category", query: { type: "popular" } }} onClick={closeMenu}>
                        <button className="hover:text-gray-300">Popular</button>
                    </Link>
                    <Link href={{ pathname: "/category", query: { type: "recent" } }} onClick={closeMenu}>
                        <button className="hover:text-gray-300">Recent</button>
                    </Link>
                    <Link href={{ pathname: "/category", query: { type: "recommended" } }} onClick={closeMenu}>
                        <button className="hover:text-gray-300">Recommended</button>
                    </Link>
                    <Link href="/personal-dashboard" onClick={closeMenu}>
                        <button className="hover:text-gray-300">Personal Dashboard</button>
                    </Link>
                </div>
                {/* Spacer */}
                <div className="flex-1"></div>
                {/* Search Bar */}
                <div className="relative hidden md:block">
                    <input type="text"
                           placeholder="Search..."
                           className="px-3 py-1 rounded-lg text-black"/>
                </div>
                {/* Search Icon for Mobile */}
                <button onClick={toggleSearch}
                        className="md:hidden block text-white">
                    <svg className="w-6 h-6"
                         fill="none"
                         stroke="currentColor"
                         viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </button>
                {/* Sign In/Sign Up Buttons */}
                <div className="space-x-2">
                    <button className="px-2 py-2" onClick={showSignupPopup}>Sign In/Sign Up</button>
                </div>
            </nav>
            {/* Mobile Left Tab Menu */}
            <div className={`${isOpen ? 'left-0' : '-left-64'} fixed inset-y-0 -left-64 w-64 bg-fhcolor text-white px-6 py-4 flex flex-col gap-3 z-20 duration-200`}>
                <button onClick={toggleMenu}
                        className="text-white mb-4">
                    <svg className="w-6 h-6"
                         fill="none"
                         stroke="currentColor"
                         viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <Link href="/" onClick={closeMenu}>
                    <button className="block hover:text-gray-300">Home</button>
                </Link>
                <Link href={{ pathname: "/category", query: { type: "popular" } }} onClick={closeMenu}>
                    <button className="block hover:text-gray-300">Popular</button>
                </Link>
                <Link href={{ pathname: "/category", query: { type: "recent" } }} onClick={closeMenu}>
                    <button className="block hover:text-gray-300">Recent</button>
                </Link>
                <Link href={{ pathname: "/category", query: { type: "recommended" } }} onClick={closeMenu}>
                    <button className="block hover:text-gray-300">Recommended</button>
                </Link>
                <Link href="/personal-dashboard" onClick={closeMenu}>
                    <button className="block hover:text-gray-300">Personal Dashboard</button>
                </Link>
            </div>

            {/* Show the Signup Popup */}
            {isSignupPopupVisible && <SignupPopup closePopup={function(): void {
                setIsSignupPopupVisible(false);
            } }/>}
        </>
    );
}
