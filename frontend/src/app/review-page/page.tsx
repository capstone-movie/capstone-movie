"use client";
import React, {useContext, useState} from "react";
import {useParams, useSearchParams} from "next/navigation";
import {postReviewAction} from "@/app/review-page/review.action";
import {SessionContext, useSessionContext} from "@/app/(index)/ContextWrapper";

const ReviewPage = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const mal_id: string = searchParams.has('id') ? searchParams.get('id') as string : '1';

    const [rating, setRating] = useState<number | null>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [containsSpoilers, setContainsSpoilers] = useState(false);
    const {session} = useSessionContext()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!rating) {
            alert("Please select a rating before submitting.");
            return;
        }


        if(!session){
            alert("Please login to submit a review.");
            return;
        }

        try {
            await postReviewAction({
                reviewJikanId: Number(mal_id),
                reviewTitle: title,
                reviewBody: content,
                reviewSpoiler: containsSpoilers,
                reviewStatus: "active",
                reviewAnimeRating: rating ?? undefined,
            });
            alert(`Review added successfully.`);
            setTitle("");
            setContent("");
            setContainsSpoilers(false);
            setRating(null);
        } catch (err) {
            console.error("Error submitting review", err)
            alert("Failed to submit review")
        }
    };
    return (
        <>
            <div className="bg-bgcolor min-h-screen flex flex-col items-center text-white">

                {/* Review Form */}
                <div className="w-full flex justify-start">
                    <main className="bg-bgcolor p-6 w-[700px]">
                        <h1 className="text-4xl font-bold mb-6">Write a Review</h1>

                        <form onSubmit={handleSubmit}>
                            <div className="flex gap-4 items-center justify-start mb-10 relative">
                                {[...Array(10)].map((_, i) => {
                                    const val = i + 1;
                                    const isSelected = rating === val;
                                    return (
                                        <div
                                            key={val}
                                            className="relative flex flex-col items-center justify-center"
                                        >
                                            {/* Rating number */}
                                            <span className="text-sm text-white">{val}</span>
                                            {/* Bullet point buttons */}
                                            <button
                                                type="button"
                                                onClick={() => setRating(val)}
                                                className={`w-6 h-6 rounded-full text-xl flex items-center justify-center transition-all
                                                ${isSelected ? "text-white" : "text-gray-500 hover:text-white"}`}
                                                aria-label={`Rating ${val}`}
                                            >
                                                ●
                                            </button>
                                            {/* Only 1 and 10 get floating labels */}
                                            {val === 1 && (
                                                <span
                                                    className="absolute -bottom-6 text-xs text-gray-400 whitespace-nowrap">
                                                    (terrible)
                                                </span>
                                            )}
                                            {val === 10 && (
                                                <span
                                                    className="absolute -bottom-6 text-xs text-gray-400 whitespace-nowrap">
                                                    (fantastic)
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            {/* Review Title */}
                            <label className="block text-lg font-semibold mb-2">Review Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="block w-full border border-gray-400 mb-4 text-white"
                                placeholder=""
                                required
                            />
                            {/* Review Content */}
                            <label className="block text-lg font-semibold mb-2">Review Content</label>
                            <textarea value={content} onChange={(e) => setContent(e.target.value)}
                                      className="text-white block w-full border border-gray-400 p-2 mb-4 h-80" required>
                            </textarea>
                            {/* Spoiler Checkbox */}
                            <div className="flex items-center mb-4">
                                <label className="text-1g">Does this review contain Spoilers? (Check box for
                                    yes)</label>
                                <input
                                    type="checkbox"
                                    checked={containsSpoilers}
                                    onChange={() => setContainsSpoilers(!containsSpoilers)}
                                    className="text-white w-5 h-5 ml-2"
                                />
                            </div>
                            {/* Tips Section */}
                            <div className="border p-4 mb-4 text-white bg-fhcolor rounded-md">
                                <h2 className="font-bold">Tips for New Writers!</h2>
                                <ul className="text-sm list-disc pl-4 mt-2">
                                    <li>Your first 105 words will be visible above the read more: Make them
                                        interesting!
                                    </li>
                                    <li>The best reviews use pronouns (I, me, my, you) very rarely.</li>
                                    <li>Avoid unnecessary openers. "This is my first review, please forgive any
                                        mistakes."
                                    </li>
                                    <li>You can describe what the work is about, but keep in mind that readers have
                                        already seen the synopsis.
                                    </li>
                                    <li>Leave an extra line between paragraphs for easier reading.</li>
                                </ul>
                            </div>
                            {/* Submit Button */}
                            <button type="submit"
                                    className="border px-4 py-2 font-semibold rounded-sm hover:text-black">
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