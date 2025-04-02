import { z } from 'zod';
import { v7 as uuid } from 'uuid'

export const reviewSchema = z.object({
    review_id: z.string().uuid({ message: "Review ID must be a valid UUID v4" }).default(() => uuid()),
    review_anime_id: z.string().uuid({ message: "Anime ID must be a valid UUID v7" }),
    review_profile_id: z.string().uuid({ message: "Profile ID must be a valid UUID v7" }),
    review_anime_rating: z.number().int().min(1).max(10, { message: "Anime rating must be a small int between 1-10" }),
    review_title: z.string().max(2048, { message: "Title must be a string with a maximum length of 2048 characters" }),
    review_body: z.string().max(2048, { message: "Body must be a string with a maximum length of 2048 characters" }),
    review_created_at: z.string().datetime({ message: "Review created date must be a valid ISO 8601 date string" }),
    review_spoiler: z.boolean(),
    review_status: z.string().max(64, { message: "Review status must be a string with a maximum length of 128 characters" })
});