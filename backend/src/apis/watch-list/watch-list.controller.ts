import {Request, Response} from "express";
import {
    addWatchListFavorite,
    getWatchListFavorite,
    deleteWatchListFavorite,

    deleteWatchListHidden,
    getWatchListHidden,
    addWatchListHidden,

    addWatchListLater,
    getWatchListLater,
    deleteWatchListLater
} from "./watch-list.model";

export async function addWatchListFavoriteController(request: Request, response: Response): Promise<any> {
    try {
        const {watchListAnimeId, watchListRank} = request.body;
        console.log(watchListAnimeId);
        console.log(watchListRank);
        const profileId = request.session.profile?.profileId;
        if (profileId === undefined) {
            return response.status(400).json({status: 400, message: "You're not logged in"})
        }
        const entry = {
            watch_list_anime_id: watchListAnimeId,
            watch_list_profile_id: profileId,
            watch_list_rank: watchListRank
        }
        await addWatchListFavorite(entry);
        return response.status(200).json({status: 200, message: "Watch list entry successful"})
    } catch (error: any) {
        return response.status(500).json({status: 500, message: error.message})
    }
}
export async function getWatchListFavoriteController(request: Request, response: Response): Promise<any> {
    try {
        const profileId = request.session.profile?.profileId;
        console.log(profileId);
        if (profileId === undefined) {
            return response.status(400).json({status: 400, message: "You're not logged in"})
        }
        const watchList = await getWatchListFavorite(profileId);
        return response.status(200).json({status: 200, message: "Watch list retrieved successfully", data: watchList})
    } catch (error: any) {
        return response.status(500).json({status: 500, message: error.message})
    }
}
export async function deleteWatchListFavoriteController(request: Request, response: Response): Promise<any> {
    try {
        const {watchListAnimeId} = request.body;
        const profileId = request.session.profile?.profileId;
        if (profileId === undefined) {
            return response.status(400).json({status: 400, message: "You're not logged in"})
        }
        await deleteWatchListFavorite(watchListAnimeId, profileId);
        return response.status(200).json({status: 200, message: "removed from watch list if exists"})
    } catch (error: any) {
        return response.status(500).json({status: 500, message: error.message})
    }
}

export async function addWatchListHiddenController(request: Request, response: Response): Promise<any> {
    try {
        const {watchListAnimeId, watchListRank} = request.body;
        console.log(watchListAnimeId);
        console.log(watchListRank);
        const profileId = request.session.profile?.profileId;
        if (profileId === undefined) {
            return response.status(400).json({status: 400, message: "You're not logged in"})
        }
        const entry = {
            watch_list_anime_id: watchListAnimeId,
            watch_list_profile_id: profileId,
            watch_list_rank: watchListRank
        }
        await addWatchListHidden(entry);
        return response.status(200).json({status: 200, message: "Watch list entry successful"})
    } catch (error: any) {
        return response.status(500).json({status: 500, message: error.message})
    }
}
export async function getWatchListHiddenController(request: Request, response: Response): Promise<any> {
    try {
        const profileId = request.session.profile?.profileId;
        console.log(profileId);
        if (profileId === undefined) {
            return response.status(400).json({status: 400, message: "You're not logged in"})
        }
        const watchList = await getWatchListHidden(profileId);
        return response.status(200).json({status: 200, message: "Watch list retrieved successfully", data: watchList})
    } catch (error: any) {
        return response.status(500).json({status: 500, message: error.message})
    }
}
export async function deleteWatchListHiddenController(request: Request, response: Response): Promise<any> {
    try {
        const {watchListAnimeId} = request.body;
        const profileId = request.session.profile?.profileId;
        if (profileId === undefined) {
            return response.status(400).json({status: 400, message: "You're not logged in"})
        }
        await deleteWatchListHidden(watchListAnimeId, profileId);
        return response.status(200).json({status: 200, message: "removed from watch list if exists"})
    } catch (error: any) {
        return response.status(500).json({status: 500, message: error.message})
    }
}

export async function addWatchListLaterController(request: Request, response: Response): Promise<any> {
    try {
        const {watchListAnimeId, watchListRank} = request.body;
        console.log(watchListAnimeId);
        console.log(watchListRank);
        const profileId = request.session.profile?.profileId;
        if (profileId === undefined) {
            return response.status(400).json({status: 400, message: "You're not logged in"})
        }
        const entry = {
            watch_list_anime_id: watchListAnimeId,
            watch_list_profile_id: profileId,
            watch_list_rank: watchListRank
        }
        await addWatchListLater(entry);
        return response.status(200).json({status: 200, message: "Watch list entry successful"})
    } catch (error: any) {
        return response.status(500).json({status: 500, message: error.message})
    }
}
export async function getWatchListLaterController(request: Request, response: Response): Promise<any> {
    try {
        const profileId = request.session.profile?.profileId;
        console.log(profileId);
        if (profileId === undefined) {
            return response.status(400).json({status: 400, message: "You're not logged in"})
        }
        const watchList = await getWatchListLater(profileId);
        return response.status(200).json({status: 200, message: "Watch list retrieved successfully", data: watchList})
    } catch (error: any) {
        return response.status(500).json({status: 500, message: error.message})
    }
}
export async function deleteWatchListLaterController(request: Request, response: Response): Promise<any> {
    try {
        const {watchListAnimeId} = request.body;
        const profileId = request.session.profile?.profileId;
        if (profileId === undefined) {
            return response.status(400).json({status: 400, message: "You're not logged in"})
        }
        await deleteWatchListLater(watchListAnimeId, profileId);
        return response.status(200).json({status: 200, message: "removed from watch list if exists"})
    } catch (error: any) {
        return response.status(500).json({status: 500, message: error.message})
    }
}
