import { Router } from 'express'
import { reviewsController } from 'reviews.controller'

// declare a basePath for this router
const basePath = '/apis/reviews'

// instantiate a new router object
const router = Router()

// define signup route for this router
router.route('/').post(reviewsController)

// export the router with the basePath and router object
export const signInRoute = { basePath, router }