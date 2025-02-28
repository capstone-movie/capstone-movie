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
            <div className="bg-bgcolor min-h-screen flex flex-col items-center text-white">

                {/* Review Form */}
                <div className="w-full flex justify-start">
                    <main className="bg-bgcolor p-6 w-[700px]">
                        <h1 className="text-4xl font-bold mb-6">Write a Review</h1>

                        <form onSubmit={handleSubmit}>
                            {/* Review Title */}
                            <label className="block text-lg font-semibold mb-2">Review Anime</label>
                            <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="block w-full border border-gray-400 mb-4 text-black"
                            placeholder=""
                            required
                            />
                            {/* Review Content */}
                            <label className="block text-lg font-semibold mb-2">Review Content</label>
                            <textarea value={content} onChange={(e) => setContent(e.target.value)} className="text-black block w-full border border-gray-400 p-2 mb-4 h-80"required>
                            </textarea>
                            {/* Spoiler Checkbox */}
                            <div className="flex items-center mb-4">
                                <label className="text-1g">Does this review contain Spoilers? (Check box for yes)</label>
                                <input
                                    type="checkbox"
                                    checked={containsSpoilers}
                                    onChange={() => setContainsSpoilers(!containsSpoilers)} className="text-black w-5 h-5 ml-2"
                                />
                            </div>
                            {/* Tips Section */}
                            <div className="border p-4 mb-4 text-white bg-fhcolor rounded-md">
                                <h2 className="font-bold">Tips for New Writers!</h2>
                                <ul className="text-sm list-disc pl-4 mt-2">
                                    <li>Your first 105 words will be visible above the read more: Make them interesting!</li>
                                    <li>The best reviews use pronouns (I, me, my, you) very rarely.</li>
                                    <li>Avoid unnecessary openers. "This is my first review, please forgive any mistakes."</li>
                                    <li>You can describe what the work is about, but keep in mind that readers have already seen the synopsis.</li>
                                    <li>Leave an extra line between paragraphs for easier reading.</li>
                                </ul>
                            </div>
                            {/* Submit Button */}
                            <button type="submit" className= "border px-4 py-2 font-semibold rounded hover ">
                                Submit Review
                            </button>
                        </form>
                    </main>
                </div>
                {/* Footer */}

            </div>
        </>
    )
}
export default ReviewPage;