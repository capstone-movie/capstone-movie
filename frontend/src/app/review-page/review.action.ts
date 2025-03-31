'use server';

export async function postReviewAction(review: {
    reviewJikanId: number;
    reviewTitle: string,
    reviewBody: string;
    reviewSpoiler: boolean;
    reviewStatus: string;
    reviewAnimeRating: number;
}) {
    const reviewContent = {
        ...review,
        reviewCreatedAt: new Date().toISOString(),
    };
    const response = await fetch(`${process.env.REST_API_URL}/apis/review/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
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