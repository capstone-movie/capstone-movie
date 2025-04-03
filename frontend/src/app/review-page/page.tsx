"use client";
import React, {useState} from "react";
import {useParams, useSearchParams} from "next/navigation";
import {postReviewAction} from "@/app/review-page/review.action";
import {useSessionContext} from "@/app/(index)/ContextWrapper";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {reviewFormSchema, ReviewFormSchema } from "@/app/review-page/review.validator";

const ReviewPage = () => {
    const searchParams = useSearchParams();
    const mal_id: string = searchParams.has('id') ? searchParams.get('id') as string : '1';
    const {session} = useSessionContext()

    const typedSession = session as { user?: { id: string } } | null;

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset
    } = useForm<ReviewFormSchema>({
        resolver: zodResolver(reviewFormSchema),
        defaultValues: {
            reviewJikanId: Number(mal_id),
            reviewProfileId: typedSession?.user?.id || undefined,
            reviewTitle: "",
            reviewBody: "",
            reviewSpoiler: false,
            reviewAnimeRating: undefined,
        }
    });
    const onSubmit = async (data: ReviewFormSchema) => {
        console.log("Submitting form data:", data);
        if (!session) {
            alert("Please login to submit a review.");
            return;
        }
        try {
            await postReviewAction({
                ...data,
                reviewStatus: "active"
            });
            console.log("Review submitted successfully");
            alert("Review added successfully.");
            reset();
        } catch (err) {
            console.error("Error submitting review:", err);
            alert("Failed to submit review");
        }
    };
    const selectedRating = watch("reviewAnimeRating");
    return (
        <div className="bg-bgcolor min-h-screen flex flex-col items-center text-white">
            <div className="w-full flex justify-start">
                <main className="bg-bgcolor p-6 w-[700px]">
                    <h1 className="text-4xl font-bold mb-6">Write a Review</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Rating Selector */}
                        <div className="flex gap-4 items-center justify-start mb-10 relative">
                            {[...Array(10)].map((_, i) => {
                                const val = i + 1;
                                const isSelected = selectedRating === val;
                                return (
                                    <div
                                        key={val}
                                        className="relative flex flex-col items-center justify-center"
                                    >
                                        <span className="text-sm text-white">{val}</span>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setValue("reviewAnimeRating", val);
                                                console.log("Rating selected:", val);
                                            }}
                                            className={`w-6 h-6 rounded-full text-xl flex items-center justify-center transition-all
                                            ${isSelected ? "text-white" : "text-gray-500 hover:text-white"}`}
                                            aria-label={`Rating ${val}`}
                                        >
                                            ●
                                        </button>
                                        {val === 1 && (
                                            <span className="absolute -bottom-6 text-xs text-gray-400 whitespace-nowrap">
                                                (terrible)
                                            </span>
                                        )}
                                        {val === 10 && (
                                            <span className="absolute -bottom-6 text-xs text-gray-400 whitespace-nowrap">
                                                (fantastic)
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        {errors.reviewAnimeRating && (
                            <p className="text-red-500 mb-4">{errors.reviewAnimeRating.message}</p>
                        )}
                        {/* Title */}
                        <label className="block text-lg font-semibold mb-2">Review Title</label>
                        <input
                            type="text"
                            {...register("reviewTitle")}
                            className="block w-full border border-gray-400 mb-4 text-white p-2"
                        />
                        {errors.reviewTitle && (
                            <p className="text-red-500 mb-4">{errors.reviewTitle.message}</p>
                        )}
                        {/* Content */}
                        <label className="block text-lg font-semibold mb-2">Review Content</label>
                        <textarea
                            {...register("reviewBody")}
                            className="text-white block w-full border border-gray-400 p-2 mb-4 h-80"
                        />
                        {errors.reviewBody && (
                            <p className="text-red-500 mb-4">{errors.reviewBody.message}</p>
                        )}
                        {/* Spoiler Checkbox */}
                        <div className="flex items-center mb-4">
                            <label className="text-1g">Contains Spoilers?</label>
                            <input
                                type="checkbox"
                                {...register("reviewSpoiler")}
                                className="text-white w-5 h-5 ml-2"
                            />
                        </div>
                        {errors.reviewSpoiler && (
                            <p className="text-red-500 mb-4">{errors.reviewSpoiler.message}</p>
                        )}
                        {/* Tips */}
                        <div className="border p-4 mb-4 text-white bg-fhcolor rounded-md">
                            <h2 className="font-bold">Tips for New Writers!</h2>
                            <ul className="text-sm list-disc pl-4 mt-2">
                                <li>Your first 105 words will be visible above the read more: Make them interesting!</li>
                                <li>The best reviews use pronouns (I, me, my, you) very rarely.</li>
                                <li>Avoid unnecessary openers.</li>
                                <li>Don't repeat the synopsis.</li>
                                <li>Leave space between paragraphs.</li>
                            </ul>
                        </div>
                        {/* Submit */}
                        <button
                            type="submit"
                            className="border px-4 py-2 font-semibold rounded-sm hover:text-black"
                        >
                            Submit Review
                        </button>
                    </form>
                </main>
            </div>
        </div>
    );
};
export default ReviewPage;