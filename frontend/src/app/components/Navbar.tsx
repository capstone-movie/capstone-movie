'use client';
import React, { useState } from 'react';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    return (
        <>
            <nav className="w-full bg-fhcolor/90 backdrop-blur-xs text-white flex justify-between items-center p-4 sticky top-0 z-20 border-b-[1px] border-[#9994]">
                {/* Hamburger Menu */}
                <button onClick={toggleMenu} className="block text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>

                {/* Title */}
                <h1 className="text-2xl font-bold ml-2">AniRection</h1>

                {/* Links */}
                <div className="md:flex space-x-6 hidden ml-4">
                    <a href="#" className="hover:text-gray-300">Top</a>
                    <a href="#" className="hover:text-gray-300">Popular</a>
                    <a href="#" className="hover:text-gray-300">Recents</a>
                </div>

                {/* Spacer */}
                <div className="flex-1"></div>

                {/* Search Bar */}
                <div className="relative hidden md:block">
                    <input type="text" placeholder="Search..." className="px-3 py-1 rounded-lg text-black" />
                </div>

                {/* Search Icon for Mobile */}
                <button onClick={toggleSearch} className="md:hidden block text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </button>

                {/* Sign In/Sign Up Buttons */}
                <div className="space-x-2">
                    <button className="px-2 py-2">Sign In/Sign Up</button>
                </div>
            </nav>

            {/* Mobile Left Tab Menu */}
            {(
                <div className={`${isOpen?'left-0':'-left-64'} fixed inset-y-0 -left-64 w-64 bg-fhcolor text-white px-6 py-4 space-y-2 z-20 duration-200`}>
                    <button onClick={toggleMenu} className="text-white mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <a href="#" className="block hover:text-gray-300">Top Airing</a>
                    <a href="#" className="block hover:text-gray-300">Most Popular</a>
                    <a href="#" className="block hover:text-gray-300">Beginner Friendly</a>
                    <a href="#" className="block hover:text-gray-300">Recently Released</a>
                    <a href="#" className="block hover:text-gray-300">Link 1</a>
                    <a href="#" className="block hover:text-gray-300">Link 2</a>
                    <a href="#" className="block hover:text-gray-300">Link 3</a>
                    <a href="#" className="block hover:text-gray-300">Link 4</a>
                </div>
            )}

            {/* Mobile Search Bar */}
            {isSearchOpen && (
                <div className="md:hidden fixed inset-x-0 top-full bg-fhcolor text-white px-6 py-2 z-20">
                    <input type="text" placeholder="Search..." className="w-full px-3 py-1 rounded-lg text-black" />
                </div>
            )}

            {/* Overlay */}
            {(isOpen || isSearchOpen) && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10" onClick={() => { setIsOpen(false); setIsSearchOpen(false); }}></div>
            )}
        </>
    );
}