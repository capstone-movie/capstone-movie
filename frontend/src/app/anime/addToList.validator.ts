import { z } from "zod";

export const addToListSchema = z.object({
    animeId: z.string().min(1, "animeId is required"),
    animeRank: z.number().int().nonnegative("animeRank must be a non-negative integer"),
    apiEndpoint: z.enum(["favorite", "later", "hidden"]),
});
export type AddToListSchema = z.infer<typeof addToListSchema>;