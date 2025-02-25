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

const Dashboard = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-gray-700 text-white text-center py-8 text-xl font-bold">
                Nav Bar / Header
            </header>
            {/* Personal Dashboard */}
            <main className="flex-grow container mx-auto p-6">
                <h1 className="text-4xl font-bold text-center text-gray-700 mb-6">
                    Personal Dashboard
                </h1>
                {/* Content */}
                {sections.map((section, index) => (
                    <div key={index} className="relative mb-8 bg-gray-300 p-6 shadow-lg min-h-[350px] flex flex-col">
                        {/* Red Placeholder */}
                        <div className="absolute top-2 right-2 w-8 h-8 bg-red-400"></div>
                        {/* Section Header */}
                        <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                        {/* Anime Placeholders */}
                        <div className="flex flex-wrap justify-center gap-16 p-4 bg-gray-400">
                            {animePlaceholders.map((anime, index) => (
                                <div key={anime.id} className="bg-white p-3 shadow-md w-[150px]">
                                    <div className="h-40 bg-gray-200 flex items-center justify-center">
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
            <footer className="bg-gray-700 text-white text-center py-8">
                Footer
            </footer>
        </div>
    );
};
export default Dashboard;