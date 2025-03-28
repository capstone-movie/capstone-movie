import {Router} from 'express'
import {
    /*    getAnimeByGenreController,*/
    getAnimeByIdController,
    getAnimeTopController,
    getAnimeRecentController,
    getAnimeSearchController
} from './anime.controller'

const basePath = '/apis/anime'

const router = Router()

router.route('/id/:animeId').get(getAnimeByIdController)
router.route('/top').get(getAnimeTopController)
router.route('/recent').get(getAnimeRecentController)
router.route('/search/:query').get(getAnimeSearchController)
/*router.route('/genre/:genre').get(getAnimeByGenreController)*/

export const animeRoute = {basePath, router}