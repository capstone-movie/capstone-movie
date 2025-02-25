"use client";
import React, { useState } from "react";

const ReviewPage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [containsSpoilers, setContainsSpoilers] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Review Submitted!\nTitle: ${title}\nContains Spoilers: ${containsSpoilers}`);
    };
    return (
        <>
            <div className="bg-gray-100 min-h-screen flex flex-col items-center">
                {/* Header */}
                <header className="bg-gray-700 text-white text-center py-8 text-xl font-bold w-full">
                    Nav Bar / Header
                </header>
                {/* Review Form */}
                <div className="w-full flex justify-start">
                    <main className="bg-white p-6 w-[700px] mt-6">
                        <h1 className="text-4xl font-bold mb-6">Write a Review</h1>

                        <form onSubmit={handleSubmit}>
                            {/* Review Title */}
                            <label className="block text-lg font-semibold mb-2">Review Anime</label>
                            <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="block w-full border border-gray-400 p-4 mb-4"
                            placeholder=""
                            required
                            />
                            {/* Review Content */}
                            <label className="block text-lg font-semibold mb-2">Review Content</label>
                            <textarea value={content} onChange={(e) => setContent(e.target.value)} className="block w-full border border-gray-400 p-2 mb-4 h-80"required>
                            </textarea>
                            {/* Spoiler Checkbox */}
                            <div className="flex items-center mb-4">
                                <label className="text-1g">Does this review contain Spoilers? (Check box for yes)</label>
                                <input
                                    type="checkbox"
                                    checked={containsSpoilers}
                                    onChange={() => setContainsSpoilers(!containsSpoilers)} className="w-5 h-5 ml-2"
                                />


                            </div>
                        </form>

                    </main>

                </div>

            </div>
        </>
    )
}
export default ReviewPage;