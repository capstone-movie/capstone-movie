'use server';

import { cookies } from 'next/headers';

export async function postReviewAction(review: {
    reviewJikanId: number;
    reviewTitle: string,
    reviewBody: string;
    reviewSpoiler: boolean;
    reviewStatus: string;
}) {
    const reviewContent = {
        ...review,
        reviewCreatedAt: new Date().toISOString(),
    };
    const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/apis/review/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewContent),
        credentials: 'include',
    });
    if(!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit review');
    }
    return response.json();
}