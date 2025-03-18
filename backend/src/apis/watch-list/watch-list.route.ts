import express from "express";
import {
    getWatchListEntryController,
    getWatchListByProfileController,
    addToWatchListController,
    updateWatchListController,
    removeFromWatchListController
} from "./watch-list.controller";

const router = express.Router();

router.get("/:animeID/:profileId", getWatchListEntryController);
router.get("/profile/:profileId", getWatchListByProfileController);
router.post("/", addToWatchListController);
router.put("/", updateWatchListController);
router.delete("/", removeFromWatchListController);

export default router;