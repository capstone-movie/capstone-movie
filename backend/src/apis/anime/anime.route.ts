import {Router} from 'express'
import {
    getAnimeByGenreController,
    getAnimeByIdController,
    getAnimeTopController,
    getAnimeRecentController
} from './anime.controller'

const basePath = '/apis/anime'

const router = Router()

router.route('/id/:anime_id').get(getAnimeByIdController)
router.route('/top').get(getAnimeTopController)
router.route('/recent').get(getAnimeRecentController)
router.route('/genre/:genre').get(getAnimeByGenreController)

export const animeRoute = {basePath, router}