import { z } from 'zod';

export const getAnimeByIdSchema = z.object({
    animeId: z.string()
})

// UUID validator
const uuid = z.string().uuid({ message: "Invalid UUID format" });

// Text validators
const text = z.string().max(255, { message: "Text exceeds maximum length of 255 characters" });
const longText = z.string().max(1000, { message: "Text exceeds maximum length of 1000 characters" });

// Date validator
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid date format, expected YYYY-MM-DD" });

// Timestamp validator
const timestamp = z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/, { message: "Invalid timestamp format, expected ISO 8601" });

// Numeric validators
const int = z.number().int({ message: "Value must be an integer" });
const float = z.number({ message: "Value must be a float" });
const smallInt = z.number().int().min(0, { message: "Value must be a positive integer" }).max(32767, { message: "Value exceeds maximum limit of 32767" });

// Anime schema
export const animeSchema = z.object({
    anime_id: uuid,
    anime_jikan_id: int.optional(),
    anime_aired_end: date.optional(),
    anime_aired_start: date.optional(),
    anime_broadcast: text.optional(),
    anime_description: longText.optional(),
    anime_demographic: text.optional(),
    anime_duration: text.optional(),
    anime_episodes: smallInt.optional(),
    anime_rating: text.optional(),
    anime_rank: int.optional(),
    anime_score: float.optional(),
    anime_status: text.optional(),
    anime_title: text,
    anime_title_english: text.optional(),
    anime_title_japanese: text.optional(),
    anime_type: text.optional(),
    anime_trailer_url: text.optional(),
    anime_youtube_thumbnail_url: text.optional(),
    anime_thumbnail_url: text.optional(),
});