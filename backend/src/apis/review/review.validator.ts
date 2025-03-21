import { z } from 'zod';
import { v7 as uuid } from 'uuid';

export const reviewSchema = z.object({
    reviewId: z.string().uuid({ message: "Review ID must be a valid UUID v7" }).default(() => uuid()),
    reviewJikanId: z.number(),
    reviewProfileId: z.string().optional(),
    reviewAnimeRating: z.number().int().min(1).max(10, { message: "Anime rating must be a small int between 1-10" }),
    reviewBody: z.string().max(2048, { message: "Body must be a string with a maximum length of 2048 characters" }),
    reviewCreatedAt: z.string().datetime({ message: "Review created date must be a valid ISO 8601 date string" }),
    reviewSpoiler: z.boolean(),
    reviewStatus: z.string().max(64, { message: "Review status must be a string with a maximum length of 128 characters" })
});

export const deleteReviewSchema = z.object({
    reviewId: z.string().uuid({ message: "Review ID must be a valid UUID v7" })
});

export const getReviewsByAnimeIdSchema = z.object({
    animeId: z.string(),
});

