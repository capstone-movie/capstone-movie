import { Router } from 'express'
import { createReviewController } from './review.controller'

// declare a basePath for this router
const basePath = '/apis/review'

// instantiate a new router object
const router = Router()

// define signup route for this router
router.route('/').post(createReviewController)

// export the router with the basePath and router object
export const reviewRoute = { basePath, router }