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
            {/* Main Dashboard Content */}
            <main className="grow container mx-auto p-6 text-white">
                <h1 className="text-4xl font-bold text-center mb-6">
                    Personal Dashboard
                </h1>

                {/* Sections */}
                {sections.map((section, index) => (
                    <div key={index} className="relative mb-2 bg-fhcolor p-6 py-6 min-h-[350px] flex flex-col rounded shadow-lg">
                        {/* More Button */}
                        <button
                            className="absolute top-4 right-4 text-sm bg-white text-black px-3 py-1 rounded-md font-semibold shadow hover:bg-gray-100 active:bg-gray-200"
                            onClick={() => alert("More clicked!")}>
                            More
                        </button>
                        {/* Section Headers */}
                        <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                        {/* Anime Placements */}
                        <div className="flex flex-nowrap justify-start sm:justify-center gap-3 sm:gap-16 px-4 sm:px-6 bg-bgcolor overflow-x-auto rounded shadow-lg">
                            {animePlaceholders.map((anime) => (
                                <div key={anime.id} className="w-[190px] flex-shrink-0 bg-white p-4 rounded shadow-lg">
                                    <div className="h-44 bg-gray-200 flex items-center justify-center rounded shadow-lg">
                                        <span className="text-xl font-bold">#{anime.id}</span>
                                    </div>
                                    <p className="text-center mt-3 text-base font-semibold">{anime.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </main>
        </div>
    )
}
export default personalDashboard