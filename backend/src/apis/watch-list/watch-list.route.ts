import express from "express";
import {
    getWatchListFavoriteController,
    deleteWatchListFavoriteController,
    addWatchListFavoriteController,
    addWatchListHiddenController,
    getWatchListHiddenController,
    deleteWatchListHiddenController,
    addWatchListLaterController,
    getWatchListLaterController,
    deleteWatchListLaterController,
} from "./watch-list.controller";
import {getWatchListFavorite} from "./watch-list.model";

const router = express.Router();

router.post("/favorite", addWatchListFavoriteController);
router.get("/favorite", getWatchListFavoriteController);
router.delete("/favorite", deleteWatchListFavoriteController);

router.post("/hidden", addWatchListHiddenController);
router.get("/hidden", getWatchListHiddenController);
router.delete("/hidden", deleteWatchListHiddenController);

router.post("/later", addWatchListLaterController);
router.get("/later", getWatchListLaterController);
router.delete("/later", deleteWatchListLaterController);

/*
router.get("/:animeID/:profileId", getWatchListEntryController);
router.post("/", addToWatchListController);
router.put("/", updateWatchListController);
router.delete("/", removeFromWatchListController);
*/

const basePath = "/apis/watch-list"

export const watchListRoute = {basePath, router}