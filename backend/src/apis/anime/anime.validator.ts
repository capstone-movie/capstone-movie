import { z } from 'zod';

export const getAnimeByIdSchema = z.object({
    animeId: z.string()
})