'use client'

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReviewEditPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const reviewId = searchParams.get("id");

    const [form, setForm] = useState({
        reviewTitle: "",
        reviewBody: "",
        reviewAnimeRating: 10,
        reviewSpoiler: false,
        reviewProfileId: "",
        reviewJikanId: 0,
        reviewCreatedAt: "",
        reviewStatus: "active",
    });

    useEffect(() => {
        if (!reviewId) {
            console.warn("No reviewId found in query params");
            return;
        }

        console.log("Fetching review with ID:", reviewId);

        const fetchReview = async () => {
            try {
                const res = await fetch(`/apis/review/get/${reviewId}`);
                const json = await res.json();

                if (res.ok && json.data) {
                    const r = json.data;
                    setForm({
                        reviewTitle: r.reviewTitle,
                        reviewBody: r.reviewBody,
                        reviewAnimeRating: r.reviewAnimeRating,
                        reviewSpoiler: r.reviewSpoiler,
                        reviewProfileId: r.reviewProfileId,
                        reviewJikanId: r.reviewJikanId,
                        reviewCreatedAt: r.reviewCreatedAt,
                        reviewStatus: r.reviewStatus || "active",
                    });
                } else {
                    alert("Failed to load review.");
                    router.push("/");
                }
            } catch (error) {
                console.error("Failed to fetch review:", error);
                alert("An error occurred while loading the review.");
                router.push("/");
            }
        };

        fetchReview();
    }, [reviewId]);

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async () => {
        const payload = {
            reviewId,
            reviewTitle: form.reviewTitle,
            reviewBody: form.reviewBody,
            reviewAnimeRating: Number(form.reviewAnimeRating),
            reviewSpoiler: form.reviewSpoiler,
            reviewProfileId: form.reviewProfileId,
            reviewJikanId: form.reviewJikanId,
            reviewCreatedAt: form.reviewCreatedAt || new Date().toISOString(),
            reviewStatus: form.reviewStatus || "active"
        };

        console.log("📦 Sending update payload:", payload);

        try {
            const res = await fetch("/apis/review/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const json = await res.json();

            if (res.ok) {
                alert("Review updated!");
                router.back();
            } else {
                console.error(json);
                alert("Failed to update review.");
            }
        } catch (err) {
            console.error("Update failed:", err);
            alert("Something went wrong during the update.");
        }
    };

    return (
        <div className="p-10 text-white max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Edit Your Review</h1>

            <label className="block font-semibold">
                Title
                <input
                    name="reviewTitle"
                    value={form.reviewTitle}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-zinc-800 border border-zinc-600 mt-1"
                />
            </label>

            <label className="block font-semibold">
                Body
                <textarea
                    name="reviewBody"
                    value={form.reviewBody}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-zinc-800 border border-zinc-600 mt-1 h-40"
                />
            </label>

            <label className="block font-semibold">
                Rating
                <input
                    type="number"
                    name="reviewAnimeRating"
                    value={form.reviewAnimeRating}
                    onChange={handleChange}
                    min="1"
                    max="10"
                    className="w-full p-2 rounded bg-zinc-800 border border-zinc-600 mt-1"
                />
            </label>

            <label className="flex gap-2 items-center">
                <input
                    type="checkbox"
                    name="reviewSpoiler"
                    checked={form.reviewSpoiler}
                    onChange={handleChange}
                />
                Mark as spoiler
            </label>

            <button
                onClick={handleSubmit}
                className="bg-blue-500 px-6 py-3 rounded-xl hover:bg-blue-600 font-bold"
            >
                Save Changes
            </button>
        </div>
    );
}