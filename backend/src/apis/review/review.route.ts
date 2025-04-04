import {Router} from 'express'
import {
    createReviewController,
    updateReviewController,
    deleteReviewController,
    getReviewsByProfileIdController,
    getReviewsByAnimeIdController,
    getReviewByIdController
} from './review.controller'

// declare a basePath for this router
const basePath = '/apis/review'

// instantiate a new router object
const router = Router()

// define signup route for this router
router.route('/create').post(createReviewController)
router.route('/update').put(updateReviewController)
router.route('/delete').delete(deleteReviewController)
router.route('/get-by-profile').get(getReviewsByProfileIdController)
router.route('/get-by-anime/:animeId').get(getReviewsByAnimeIdController)
router.route('/get/:id').get(getReviewByIdController);

// export the router with the basePath and router object
export const reviewRoute = {basePath, router}