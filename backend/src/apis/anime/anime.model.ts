import {sql} from "../../utils/database.utils";
import { z } from 'zod';
import {reviewSchema} from "./review.validator";

export async function insertReviews(reviewData: z.infer<typeof reviewSchema>): Promise<boolean> {
    const {
        review_id,
        review_anime_id,
        review_profile_id,
        review_anime_rating,
        review_body,
        review_created_at,
        review_spoiler,
        review_status
    } = reviewData;

    await sql`INSERT INTO review (review_id, review_anime_id, review_profile_id, review_anime_rating, review_body, review_created_at, review_spoiler, review_status)
              VALUES (${review_id}, ${review_anime_id}, ${review_profile_id}, ${review_anime_rating}, ${review_body}, ${review_created_at}, ${review_spoiler}, ${review_status})`;

    return true;
}
export async function updateReviews(reviewData: z.infer<typeof reviewSchema>): Promise<boolean> {
    const {
        review_id,
        review_anime_id,
        review_profile_id,
        review_anime_rating,
        review_body,
        review_created_at,
        review_spoiler,
        review_status
    } = reviewData;

    await sql`UPDATE review
              SET review_anime_id = ${review_anime_id},
                  review_profile_id = ${review_profile_id},
                  review_anime_rating = ${review_anime_rating},
                  review_body = ${review_body},
                  review_created_at = ${review_created_at},
                  review_spoiler = ${review_spoiler},
                  review_status = ${review_status}
              WHERE review_id = ${review_id}`;

    return true;
}
export async function deleteReviews(reviewId: string): Promise<boolean> {
    await sql`DELETE FROM review WHERE review_id = ${reviewId}`;
    return true;
}
export async function getProfileIdByReviewId(reviewId: string): Promise<string | null> {
    const result = await sql`SELECT review_profile_id FROM review WHERE review_id = ${reviewId}`;
    return result.length > 0 ? result[0].review_profile_id : null;
}
export async function getReviewsByProfileId(profileId: string): Promise<any[]> {
    const result = await sql`SELECT * FROM review WHERE review_profile_id = ${profileId}`;
    return result;
}
export async function getReviewsByAnimeId(animeId: string): Promise<any[]> {
    const result = await sql`SELECT * FROM review WHERE review_anime_id = ${animeId}`;
    return result;
}