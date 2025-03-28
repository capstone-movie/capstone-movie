'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from "next/link";
import SignupPopup from "@/app/components/Signup-Popup";
import LoginPopup from "@/app/components/Login-Popup";
import { clearSession, getSession, Session } from "@/utils/auth.utils";
import { postSignIn } from "@/utils/models/sign-in/sign-in.action";
import { postSignOut } from "@/utils/models/sign-out/sign-out.action";
import { searchAnime } from "@/utils/models/search/search.action";
import * as querystring from "node:querystring";

interface NavbarProps {
    clearSessionAction?: any
}

export function Navbar({ clearSessionAction }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSignupPopupVisible, setIsSignupPopupVisible] = useState(false);
    const [isLoginPopupVisible, setIsLoginPopupVisible] = useState(false);
    const [session, setSession] = useState<Session | undefined>(undefined);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const searchRef = useRef(null);
    const debounceTimeoutRef = useRef(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                setSession(await getSession())
            } catch (error) {
                console.error('Error fetching session:', error);
            }
        };
        fetchSession();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchResults([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Add effect to disable body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const showSignupPopup = () => {
        setIsSignupPopupVisible(true);
    };

    const showLoginPopup = () => {
        setIsLoginPopupVisible(true);
    };

    const handleLogout = () => {
        postSignOut().then(r => {
            setSession(undefined)
        })
    }

    const handleSearch = (query) => {
        if (query) {
            searchAnime(query).then(data => {
                if (data && Array.isArray(data)) {
                    setSearchResults(data.slice(0, 3));
                } else {
                    setSearchResults([]);
                }
            }).catch(error => {
                console.error('Error during search:', error);
                setSearchResults([]);
            });
        } else {
            setSearchResults([]);
        }
    }

    const handleInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
        debounceTimeoutRef.current = setTimeout(() => {
            handleSearch(query);
        }, 100);

        if (query.length === 0) {
            setSearchResults([]);
        }
    }

    const handleResultClick = () => {
        setSearchQuery("");
        setSearchResults([]);
        setIsSearchOpen(false);
    }

    return (
        <>
            <nav className="w-full bg-fhcolor/90 backdrop-blur-xs text-white flex justify-between items-end p-4 sticky top-0 z-20 border-b-[1px] border-[#9994]">
                {/* Hamburger Menu */}
                <button onClick={toggleMenu} className="block text-white mb-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>

                {/* Navigation Container */}
                <div className="flex items-end space-x-6">
                    {/* Title */}
                    <Link href="/" onClick={closeMenu} className="flex items-center">
                        <h1 className="text-2xl ml-2 font-bold">AniRection</h1>
                    </Link>

                    {/* Links */}
                    <div className="hidden md:flex items-end space-x-6">
                        <Link href={{ pathname: "/category", query: { type: "popular" } }} onClick={closeMenu}>
                            <span className="hover:text-gray-300 pb-0.5">Popular</span>
                        </Link>
                        <Link href={{ pathname: "/category", query: { type: "recent" } }} onClick={closeMenu}>
                            <span className="hover:text-gray-300 pb-0.5">Recent</span>
                        </Link>
                        <Link href={{ pathname: "/category", query: { type: "recommended" } }} onClick={closeMenu}>
                            <span className="hover:text-gray-300 pb-0.5">Recommended</span>
                        </Link>
                        <Link href="/personal-dashboard" onClick={closeMenu}>
                            <span className="hover:text-gray-300 pb-0.5">Personal Dashboard</span>
                        </Link>
                    </div>
                </div>

                {/* Spacer */}
                <div className="flex-1"></div>

                {/* Desktop Search Bar */}
                <div className="relative hidden md:block self-center" ref={searchRef}>
                    <input type="text" placeholder="Search..." className="px-3 py-1 rounded-lg text-white placeholder-gray-200 bg-black/20" onChange={handleInputChange} value={searchQuery} />
                    {/* Search Results for Desktop */}
                    {searchQuery.length > 0 && (
                        <div className="absolute top-full left-0 w-full bg-fhcolor text-white rounded-b-lg shadow-lg border-t-2 border-fhcolor">
                            {searchResults.length > 0 ? (
                                searchResults.map((result, index) => (
                                    <Link key={index} href={{ pathname: "/anime", query: { id: result.animeJikanId } }}>
                                        <div className="p-2 border-b border-gray-700 flex items-center cursor-pointer hover:bg-fhcolor/80 transition-colors duration-200" onClick={handleResultClick}>
                                            <img src={result.animeThumbnailUrl} alt={result.animeTitle} className="w-10 h-10 mr-2 rounded" />
                                            <span>{result.animeTitleEnglish ? result.animeTitleEnglish : result.animeTitleJapanese}</span>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="p-2 text-center text-gray-400">No results found</div>
                            )}
                        </div>
                    )}
                </div>

                {/* Search Icon for Mobile */}
                <button onClick={toggleSearch} className="md:hidden block text-white mb-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </button>

                {/* Sign In/Sign Up Buttons */}
                <div className="flex items-end space-x-2">
                    {session ? (
                        <button onClick={handleLogout} className="px-2 pb-0.5 hover:bg-white/20 duration-200 rounded-md">Log Out</button>
                    ) : (
                        <>
                            <button className="px-2 pb-0.5 hover:bg-white/20 duration-200 rounded-md" onClick={showLoginPopup}>Login</button>
                            <button className="px-2 pb-0.5 hover:bg-white/20 duration-200 rounded-md" onClick={showSignupPopup}>Sign Up</button>
                        </>
                    )}
                </div>
            </nav>

            {/* Mobile Search Bar - appears below the navbar */}
            {isSearchOpen && (
                <div className="md:hidden w-full bg-fhcolor/95 py-3 px-4 sticky top-[73px] z-10 border-b-[1px] border-[#9994] shadow-md">
                    <div className="relative w-full" ref={searchRef}>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-3 py-2 rounded-lg text-white placeholder-gray-200 bg-black/20"
                            onChange={handleInputChange}
                            value={searchQuery}
                            autoFocus
                        />
                        {/* Search Results for Mobile */}
                        {searchQuery.length > 0 && (
                            <div className="absolute top-full left-0 w-full bg-fhcolor text-white rounded-b-lg shadow-lg border-t-2 border-fhcolor">
                                {searchResults.length > 0 ? (
                                    searchResults.map((result, index) => (
                                        <Link key={index} href={{ pathname: "/anime", query: { id: result.animeJikanId } }}>
                                            <div className="p-2 border-b border-gray-700 flex items-center cursor-pointer hover:bg-fhcolor/80 transition-colors duration-200" onClick={handleResultClick}>
                                                <img src={result.animeThumbnailUrl} alt={result.animeTitle} className="w-10 h-10 mr-2 rounded" />
                                                <span>{result.animeTitleEnglish ? result.animeTitleEnglish : result.animeTitleJapanese}</span>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="p-2 text-center text-gray-400">No results found</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Mobile Left Tab Menu */}
            <div className={`${isOpen ? 'left-0' : '-left-64'} fixed inset-y-0 -left-64 w-64 bg-fhcolor text-white px-6 py-4 flex flex-col gap-3 z-30 duration-200`}>
                <button onClick={toggleMenu} className="text-white mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
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

            {/* Dark overlay when menu is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20"
                    onClick={closeMenu}
                    aria-hidden="true"
                ></div>
            )}

            {/* Show the Login Popup */}
            {isLoginPopupVisible && <LoginPopup closePopup={() => setIsLoginPopupVisible(false)} />}

            {/* Show the Signup Popup */}
            {isSignupPopupVisible && <SignupPopup closePopup={() => setIsSignupPopupVisible(false)} />}
        </>
    );
}