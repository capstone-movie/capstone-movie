import { z } from "zod";
import { v7 as uuid } from 'uuid';

export const watchListSchema = z.object({
    watchListAnimeId: z.string().uuid({ message: "Anime ID must be a valid UUID v7" }).default(() => uuid()),
    watchListFavorite: z.number().int().optional(),
    watchListHidden: z.number().int().optional(),
    watchListLater: z.number().int().optional(),
})
// get watch list by profile ID
export const getWatchListByProfileSchema = z.object({
    profileId: z.string().uuid({ message: "Profile ID must be a valid UUID v7" })
})
// update watch list
export const updateWatchListSchema = z.object({
    animeId: z.string().uuid({ message: "Anime ID must be a valid UUID v7" }),
    watchListFavorite: z.number().int().optional(),
    watchListHidden: z.number().int().optional(),
    watchListLater: z.number().int().optional(),
})
// watch later
export const removeWatchLaterSchema = z.object({
    animeId: z.string().uuid({ message: "Anime ID must be a valid UUID v7" }),
})
export const addWatchLaterSchema = z.object({
    animeId: z.string().uuid({ message: "Anime ID must be a valid UUID v7" }),
})
// favorite
export const addFavoriteSchema = z.object({
    animeId: z.string().uuid({ message: "Anime ID must be a valid UUID v7" }),
})
export const removeFavoriteSchema = z.object({
    animeId: z.string().uuid({ message: "Anime ID must be a valid UUID v7" }),
})
// hidden
export const setHiddenSchema = z.object({
    animeId: z.string().uuid({ message: "Anime ID must be a valid UUID v7" }),
})
export const removeHiddenSchema = z.object({
    animeId: z.string().uuid({ message: "Anime ID must be a valid UUID v7" }),
})