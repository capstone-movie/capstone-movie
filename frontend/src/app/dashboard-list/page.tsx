"use client";
import React from "react";

const animePlaceholders = [
    { id: 1, title: "Anime Title #1" },
    { id: 2, title: "Anime Title #2" },
    { id: 3, title: "Anime Title #3" },
    { id: 4, title: "Anime Title #4" },
    { id: 5, title: "Anime Title #5" },
];


const dashboardList = () => {
    return (
        <>
            <div className="flex justify-center items-center min-h-screen p-6">
                <div className="relative bg-gray-300 p-4 max-w-screen-lg w-full">
                    {/* Red Placeholder Button */}
                    <button
                        className="absolute top-2 right-2 w-6 h-6 bg-red-400 flex items-center justify-center shadow-md hover:bg-red-500 active:bg-red-600"
                        onClick={() => alert("Button Clicked!")}>
                    </button>

                    {/* Section Header */}
                    <h2 className="text-2xl font-bold text-center mb-4">Dashboard</h2>

                    {/* Anime Placeholders */}
                    <div className="flex flex-wrap justify-center gap-8 p-4 bg-gray-400">
                        {animePlaceholders.map((anime) => (
                            <div key={anime.id} className={`bg-white p-3 shadow-md w-[140px] 
                            ${anime.id === 4 || anime.id === 5 ? "hidden sm:block" : ""}`}>
                                <div className="h-36 bg-gray-200 flex items-center justify-center">
                                    <span className="text-lg font-bold">#{anime.id}</span>
                                </div>
                                <p className="text-center mt-2">{anime.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default dashboardList