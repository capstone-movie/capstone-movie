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

const router = express.Router();

router.route("/favorite")
    .post(addWatchListFavoriteController)
    .get(getWatchListFavoriteController)
    .delete(deleteWatchListFavoriteController)

router.route("/hidden")
    .post(addWatchListHiddenController)
    .get(getWatchListHiddenController)
    .delete(deleteWatchListHiddenController)

router.route("/later")
    .post(addWatchListLaterController)
    .get(getWatchListLaterController)
    .delete(deleteWatchListLaterController)

const basePath = "/apis/watch-list"

export const watchListRoute = {basePath, router}