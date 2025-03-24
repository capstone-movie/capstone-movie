import {Router} from 'express'
import {getAllGenresController, getAnimeByGenreNameController} from "./genres.controller";

const basePath = '/apis/genres'

const router = Router()

router.route('/all').get(getAllGenresController)
router.route('/:genresName').get(getAnimeByGenreNameController)

export const genresRoute = {basePath, router}