'use server';

import {setHeaders} from "@/utils/set-headers.utils";

export async function postReviewAction(review: any) {
    const {
        reviewJikanId,
        reviewTitle,
        reviewBody,
        reviewSpoiler,
        reviewStatus,
        reviewAnimeRating,
    } = review;
    const reviewContent = {
        ...review,
        reviewCreatedAt: new Date().toISOString(),
    };
    const response = await fetch(`${process.env.REST_API_URL}/apis/review/create`, {
        method: 'POST',
        headers: await setHeaders(),
        body: JSON.stringify(reviewContent),
        credentials: 'include',
    });
    if (!response.ok) {
        const error = await response.json();
        console.error('Error response from server:', error);
        throw new Error(
            Array.isArray(error.message)
                ? error.message.map((m: any) => m.message).join(', ')
                : error.message || 'Failed to submit review'
        );
    }
    return response.json();
}