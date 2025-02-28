"use client";
import React from "react";

const sections = [
    { title: "Favorite Anime" },
    { title: "Watch Later" },
    { title: "Recommendations" },
    { title: "Hidden" },
];

const animePlaceholders = [
    { id: 1, title: "Anime Title #1" },
    { id: 2, title: "Anime Title #2" },
    { id: 3, title: "Anime Title #3" },
    { id: 4, title: "Anime Title #4" },
    { id: 5, title: "Anime Title #5" },
];

const personalDashboard = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-20">

            {/* Header */}
            <header className="bg-gray-700 text-white text-center py-6 text-xl">
                Nav Bar / Header
            </header>

            {/* Main Dashboard Content */}
            <main className="flex-grow container mx-auto p-6">
                <h1 className="text-4xl font-bold text-center text-gray-700 mb-6">
                    Personal Dashboard
                </h1>

                {/* Sections */}
                {sections.map((section, index) => (
                    <div key={index} className="relative mb-8 bg-gray-300 p-6 min-h-[350px] flex flex-col">
                        {/* Red Placeholder Button */}
                        <button
                            className="absolute top-2 right-2 w-6 h-6 bg-red-400 flex items-center justify-center shadow-md hover:bg-red-500 active:bg-red-600"
                            onClick={() => alert("Button Clicked!")}>
                        </button>

                        {/* Section Header */}
                        <h2 className="text-2xl font-bold mb-4">{section.title}</h2>

                        {/* Anime Placeholders */}
                        <div className="flex flex-nowrap sm:flex-wrap justify-center gap-6 sm:gap-16 lg:gap-24 p-6 bg-gray-400 overflow-x-auto">
                            {animePlaceholders.map((anime) => (
                                <div key={anime.id} className={`bg-white p-3 w-[140px]
                                    ${anime.id === 4 || anime.id === 5 ? "hidden sm:block" : ""}`}>
                                    <div className="h-36 bg-gray-200 flex items-center justify-center">
                                        <span className="text-lg font-bold">#{anime.id}</span>
                                    </div>
                                    <p className="text-center mt-2 font-medium">{anime.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </main>

            {/* Footer */}
            <footer className="bg-gray-700 text-white text-center py-6">
                Footer
            </footer>
        </div>
    )
}
export default personalDashboard