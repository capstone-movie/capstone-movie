import {sql} from "../../utils/database.utils";
import {z} from 'zod';
import {reviewSchema} from "./review.validator";

export async function insertReviews(reviewData: z.infer<typeof reviewSchema>): Promise<boolean> {

    const {
        reviewId,
        reviewJikanId,
        reviewProfileId,
        reviewAnimeRating,
        reviewTitle,
        reviewBody,
        reviewCreatedAt,
        reviewSpoiler,
        reviewStatus
    } = reviewData;

    await sql`INSERT INTO review (review_id, review_jikan_id, review_profile_id, review_anime_rating, review_title, review_body,
                                  review_created_at, review_spoiler, review_status)
              VALUES (${reviewId}, ${reviewJikanId}, ${reviewProfileId}, ${reviewAnimeRating}, ${reviewTitle}, ${reviewBody},
                      ${reviewCreatedAt}, ${reviewSpoiler}, ${reviewStatus})`;

    return true;
}

export async function updateReviews(reviewData: z.infer<typeof reviewSchema>): Promise<boolean> {
    const {
        reviewId,
        reviewJikanId,
        reviewProfileId,
        reviewAnimeRating,
        reviewTitle,
        reviewBody,
        reviewCreatedAt,
        reviewSpoiler,
        reviewStatus
    } = reviewData;

    await sql`UPDATE review
              SET review_jikan_id     = ${reviewJikanId},
                  review_profile_id   = ${reviewProfileId},
                  review_anime_rating = ${reviewAnimeRating},
                  review_title        = ${reviewTitle},
                  review_body         = ${reviewBody},
                  review_created_at   = ${reviewCreatedAt},
                  review_spoiler      = ${reviewSpoiler},
                  review_status       = ${reviewStatus}
              WHERE review_id = ${reviewId}`;

    return true;
}

export async function deleteReviews(reviewId: string): Promise<boolean> {
    await sql`DELETE
              FROM review
              WHERE review_id = ${reviewId}`;
    return true;
}

export async function getProfileIdByReviewId(reviewId: string): Promise<string | null> {
    const result = await sql`SELECT review_profile_id
                             FROM review
                             WHERE review_id = ${reviewId}`;
    return result.length > 0 ? result[0].reviewProfileId : null;
}

export async function getReviewsByProfileId(profileId: string): Promise<any[]> {
    const result = await sql`SELECT *
                             FROM review
                             WHERE review_profile_id = ${profileId}`;
    return result;
}

export async function getReviewsByAnimeId(animeJikanId: number): Promise<any[]> {
    const result = await sql`SELECT
                                 r.review_anime_rating,
                                 r.review_id,
                                 r.review_title,
                                 r.review_body,
                                 r.review_created_at,
                                 r.review_spoiler,
                                 r.review_profile_id,
                                 p.profile_username
                             FROM review r
                                      JOIN profile p ON r.review_profile_id = p.profile_id
                             WHERE review_jikan_id = ${animeJikanId}
                             ORDER BY r.review_created_at DESC`;
    return result;
}
