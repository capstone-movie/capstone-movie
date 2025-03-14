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
                <h1 className="text-4xl font-bold text-center  mb-6">
                    Personal Dashboard
                </h1>

                {/* Sections */}
                {sections.map((section, index) => (
                    <div key={index} className="relative mb-8 bg-fhcolor p-6 min-h-[350px] flex flex-col rounded shadow-lg">
                        {/* Red Placeholder Button */}
                        <button
                            className="absolute top-2 right-2 w-6 h-6 bg-red-400 flex items-center justify-center rounded shadow-lg hover:bg-red-500 active:bg-red-600"
                            onClick={() => alert("Clicked!")}>
                        </button>
                        {/* Section Header */}
                        <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                        {/* Anime Placeholders */}
                        <div className="flex flex-nowrap sm:flex-wrap justify-center gap-16 p-6 bg-bgcolor overflow-x-auto rounded shadow-lg">
                            {animePlaceholders.map((anime) => (
                                <div key={anime.id} className={`bg-white p-3 w-[150px] rounded shadow-lg`}>
                                    <div className="h-36 bg-gray-200 flex items-center justify-center rounded shadow-lg">
                                        <span className="text-lg font-bold">#{anime.id}</span>
                                    </div>
                                    <p className="text-center mt-2 font-medium">{anime.title}</p>
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