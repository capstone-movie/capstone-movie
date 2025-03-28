import {sql} from "../../utils/database.utils";
import { z } from 'zod';
import {reviewSchema} from "../create-review/create-reviews.validator";

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

    await sql`INSERT INTO reviews (review_id, review_anime_id, review_profile_id, review_anime_rating, review_body, review_created_at, review_spoiler, review_status)
              VALUES (${review_id}, ${review_anime_id}, ${review_profile_id}, ${review_anime_rating}, ${review_body}, ${review_created_at}, ${review_spoiler}, ${review_status})`;

    return true;
}
