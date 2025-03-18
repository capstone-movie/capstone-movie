import { z } from 'zod';

export const animeSchema = z.object({
    animeId: z.number(),
    animeAiredEnd: z.date().optional(),
    animeAiredStart: z.date().optional(),
    animeBroadcast: z.string().max(256, { message: "Anime broadcast must be a string with a maximum length of 256 characters" }).optional(),
    animeDescription: z.string().max(2048, { message: "Anime description must be a string with a maximum length of 2048 characters" }).optional(),
    animeDemographic: z.string().max(256, { message: "Anime demographic must be a string with a maximum length of 256 characters" }).optional(),
    animeDuration: z.number().optional(),
    animeEpisodes: z.number().int().max(32767, { message: "Anime episodes must be a small integer" }).optional(),
    animeGenres: z.string().max(256, { message: "Anime genres must be a string with a maximum length of 256 characters" }).optional(),
    animeInstagramUrl: z.string().url({ message: "Anime Instagram URL must be a valid URL" }).max(2048, { message: "Anime Instagram URL must be a string with a maximum length of 2048 characters" }).optional(),
    animeOfficialWebsiteUrl: z.string().url({ message: "Anime official website URL must be a valid URL" }).max(2048, { message: "Anime official website URL must be a string with a maximum length of 2048 characters" }).optional(),
    animeProducer: z.string().max(256, { message: "Anime producer must be a string with a maximum length of 256 characters" }).optional(),
    animeRating: z.number().optional(),
    animeStatus: z.string().max(128, { message: "Anime status must be a string with a maximum length of 128 characters" }).optional(),
    animeTitle: z.string().max(256, { message: "Anime title must be a string with a maximum length of 256 characters" }),
    animeTitleAlt: z.string().max(256, { message: "Anime alternate title must be a string with a maximum length of 256 characters" }).optional(),
    animeTwitterUrl: z.string().url({ message: "Anime Twitter URL must be a valid URL" }).max(2048, { message: "Anime Twitter URL must be a string with a maximum length of 2048 characters" }).optional(),
    animeType: z.string().max(128, { message: "Anime type must be a string with a maximum length of 128 characters" }).optional()
});

export const getAnimeByIdSchema = z.object({
    anime_id: z.string()
})