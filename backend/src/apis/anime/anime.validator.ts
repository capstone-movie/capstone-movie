import { z } from 'zod';

export const getAnimeByIdSchema = z.object({
    anime_id: z.string()
})