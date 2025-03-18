import { Request, Response } from "express";
import {
    insertWatchList,
    updateWatchListEntry,
    deleteWatchListEntry,
    getWatchListByProfileId,
    getWatchListEntry
} from "./watch-list.model";
import { z } from "zod";
import {
    watchListSchema,
    getWatchListByProfileSchema,
    updateWatchListSchema,
} from "./watch-list.validator";

/*
 * get a specific watch list entry
 * retrieves a watch list entry based upon anime ID and profile ID
 */

export async function getWatchListEntryController(request: Request, response: Response): Promise<any> {
    try {
        const { animeId, profileId} = request.params;
        const watchListEntry = await getWatchListEntry(animeId, profileId);

        if(!watchListEntry) {
            return response.status(404).json({status: 404, message: "Watch list entry not found"})
        }
        return response.status(200).json({ status: 200, message: "Watch list entry successful", data: watchListEntry})
    } catch (error: any) {
        return response.status(500).json({status: 500, message: error.message})
    }
}

/*
 * get all watch list entries for a profile ID
 */

export async function getWatchListByProfileController(request: Request, response: Response): Promise<any> {
    try {
        const { profileId} = request.params;

        const validationResult = getWatchListByProfileSchema.safeParse({ profileId });
        if (!validationResult.success) {
            return response.status(400).json({ status: 400, message: validationResult.error.format() })
        }
        const watchList = await getWatchListByProfileId(profileId);
        if(!watchList.length) {
            return response.status(404).json({ status: 404, message: "No watch list entries found for this profile" })
        }
        return response.status(200).json({ status: 200, message: "Watch list retrieved successfully", data: watchList})
    } catch (error: any) {
        return response.status(500).json({ status: 500, message: error.message })
    }
}

/*
 * adds an anime to the watch list
 * creates a new watch list entry or updates an existing one
 */

export async function addToWatchListController(request: Request, response: Response): Promise<any> {
    try {
        const validationResult = watchListSchema.safeParse(request.body);

        if(!validationResult.success) {
            return response.status(400).json({ status: 400, message: validationResult.error.errors})
        }
        await insertWatchList(validationResult.data);
        return response.status(201).json({ status: 201, message: "Added to watch list successfully" })
    } catch (error: any) {
        return response.status(500).json({ status: 500, message: error.message })
    }
}

/*
 * update a watch list entry
 * updates an existing watch list entry status (Favorite, Hidden, Later)
 */

export async function updateWatchListController(request: Request, response: Response): Promise<any> {
    try {
        const validationResult = updateWatchListSchema.safeParse(request.body);

        if(!validationResult.success) {
            return response.status(400).json({ status: 400, message: validationResult.error.format() })
        }
        const updatedData = {
            watchListAnimeId: validationResult.data.animeId,
            watchListProfileId: validationResult.data.profileId,
            watchListFavorite: validationResult.data.watchListFavorite,
            watchListHidden: validationResult.data.watchListHidden,
            watchListLater: validationResult.data.watchListLater,
        }
        await updateWatchListEntry(updatedData);
        return response.status(200).json({ status: 200, message: "Watch list updated successfully" })
    } catch (error: any) {
        return response.status(500).json({ status: 500, message: error.message })
    }
}

/*
 * remove an anime from the watch list
 * deletes an entry from the watch list
 */

export async function removeFromWatchListController(request: Request, response: Response): Promise<any> {
    try {
        const { animeId, profileId } = request.body;
        if(!animeId || !profileId) {
            return response.status(400).json({ status: 400, message: "animeId and profileId are required" })
        }
        await deleteWatchListEntry(animeId, profileId);
        return response.status(200).json({ status: 200, message: "removed from watch list successfully" })
    } catch (error: any) {
        return response.status(500).json({ status: 500, message: error.message })
    }
}