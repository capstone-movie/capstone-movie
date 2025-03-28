import { Router } from 'express'
import { createReviewsController } from './create-reviews.controller'

// declare a basePath for this router
const basePath = '/apis/create-review'

// instantiate a new router object
const router = Router()

// define signup route for this router
router.route('/').post(createReviewsController)

// export the router with the basePath and router object
export const createReviewsRoute = { basePath, router }