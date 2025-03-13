import {Router} from 'express'
import {
    createReviewController,
    updateReviewController,
    deleteReviewController,
    getReviewsByProfileIdController,
    getReviewsByAnimeIdController
} from './review.controller'

// declare a basePath for this router
const basePath = '/apis/review'

// instantiate a new router object
const router = Router()

// define signup route for this router
router.route('/create').post(createReviewController)
router.route('/update').post(updateReviewController)
router.route('/delete').post(deleteReviewController)
router.route('/get-review-by-profile-id').post(getReviewsByProfileIdController)
router.route('/get-review-by-anime-id').post(getReviewsByAnimeIdController)

// export the router with the basePath and router object
export const reviewRoute = {basePath, router}