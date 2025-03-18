import {Router} from 'express'
import {
    getAnimeByIdController
} from './anime.controller'

// declare a basePath for this router
const basePath = '/apis/anime'

// instantiate a new router object
const router = Router()

// define signup route for this router
router.route('/id/:anime_id').get(getAnimeByIdController)
//router.route('/new').get(getNewAnimesController)
//router.route('/top').get(getTopAnimesController)

// export the router with the basePath and router object
export const animeRoute = {basePath, router}