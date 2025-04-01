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
        await updateWatchList(request, response, getWatchListFavorite, addWatchListFavorite);
    } catch (error: any) {
        return response.status(500).json({status: 500, message: error.message})
    }
}

export async function getWatchListFavoriteController(request: Request, response: Response): Promise<any> {
    try {
        const profileId = request.session.profile?.profileId;
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
        await updateWatchList(request, response, getWatchListHidden, addWatchListHidden);
    } catch (error: any) {
        return response.status(500).json({status: 500, message: error.message})
    }
}

export async function getWatchListHiddenController(request: Request, response: Response): Promise<any> {
    try {
        const profileId = request.session.profile?.profileId;
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
        await updateWatchList(request, response, getWatchListLater, addWatchListLater);
    } catch (error: any) {
        return response.status(500).json({status: 500, message: error.message})
    }
}

export async function getWatchListLaterController(request: Request, response: Response): Promise<any> {
    try {
        const profileId = request.session.profile?.profileId;
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



//helper function
export async function updateWatchList(
    request: any,
    response: any,
    getWatchList: (profileId: string) => Promise<any[]>,
    addWatchList: (entry: any) => Promise<boolean>
): Promise<void> {
    const {watchListAnimeId, watchListRank} = request.body;
    const profileId = request.session.profile?.profileId;
    if (profileId === undefined) {
        return response.status(400).json({status: 400, message: "You're not logged in"})
    }
    const entry = {
        watchListAnimeId: watchListAnimeId,
        watchListProfileId: profileId,
        watchListRank: watchListRank
    };
    const watchList = await getWatchList(profileId);
    const newList = watchList.filter(item => item.watchListAnimeId !== watchListAnimeId);
    newList.splice(watchListRank, 0, entry);
    newList.forEach((item, index) => {
        item.watchListRank = index;
    });
    await Promise.all(newList.map(entry => addWatchList(entry)));
    return response.status(200).json({status: 200, message: "Watch list entry successful"})
}
