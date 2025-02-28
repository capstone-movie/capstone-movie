'use client'
import React, { useState } from "react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="w-full bg-fhcolor text-white">
            {/* Row 1: Name & Sign In */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
                <h1 className="text-2xl font-bold">AniRection</h1>
                <div className="">
                    <button className="px-2 py-2">
                        Sign In
                    </button>
                    <button className="px-2 py-2">
                        Sign Up
                    </button>
                </div>
            </div>

            {/* Row 2: Links & Search */}
            <div className="flex justify-between items-center px-4 py-2">
                <div className="md:flex space-x-6 hidden md:block">
                    <a href="#" className="hover:text-gray-300">Top Airing</a>
                    <a href="#" className="hover:text-gray-300">Most Popular</a>
                    <a href="#" className="hover:text-gray-300">Beginner Friendly</a>
                    <a href="#" className="hover:text-gray-300">Recently Released</a>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-3 py-1 rounded-lg text-black"
                    />
                </div>
                <button onClick={toggleMenu} className="md:hidden block text-white">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-6 py-2 space-y-2">
                    <a href="#" className="block hover:text-gray-300">Top Airing</a>
                    <a href="#" className="block hover:text-gray-300">Most Popular</a>
                    <a href="#" className="block hover:text-gray-300">Beginner Friendly</a>
                    <a href="#" className="block hover:text-gray-300">Recently Released</a>
                </div>
            )}
        </nav>
    );
}