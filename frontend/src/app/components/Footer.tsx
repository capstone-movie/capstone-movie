import React from 'react';

export function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8 bottom-0 w-full">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <div className="mb-4 text-center">
                    <h2 className="text-2xl font-bold">Newsletter</h2>
                    <p>Sign up for your daily AniRection</p>
                    <div className="flex justify-center items-center mt-2 max-w-[70vw]">
                        <input
                            type="email"
                            placeholder="Enter your email here"
                            className="p-2 mr-2 rounded border border-gray-300 w-64"
                        />
                        <button className="p-2 rounded bg-orange-500 text-white max-w-[25vw]">Subscribe</button>
                    </div>
                </div>
                <hr className="w-full border-t border-gray-700 my-4" />
                <nav>
                    <ul className="flex justify-center">
                        <li className="m-2"><a href="/home" className="text-white hover:underline">Home</a></li>
                        <li className="m-2"><a href="/about" className="text-white hover:underline">About</a></li>
                        <li className="m-2"><a href="/contact" className="text-white hover:underline">Contact</a></li>
                        <li className="m-2"><a href="/privacy-policy" className="text-white hover:underline">Privacy Policy</a></li>
                        <li className="m-2"><a href="/terms-of-service" className="text-white hover:underline">Terms of Service</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};