import { generateJwt, validatePassword } from '../../utils/auth.utils'
import { Request, Response } from 'express'
import { reviewSchema } from './create-reviews.validator'
import { zodErrorResponse } from '../../utils/response.utils'
import { v7 as uuid } from 'uuid'
import {Status} from "../../utils/interfaces/Status";
import {insertReviews} from "../reviews/reviews.model";

/**
 * Create Review Controller
 *
 * This controller handles the creation of new reviews. It utilizes the ReviewSchema from zod
 * to validate the structure and content of the review data coming from the request body.
 * Each review is identified by a unique UUID and contains information about the anime,
 * the profile of the reviewer, the rating, the review body, creation date, spoiler status,
 * and the status of the review.
 *
 * @param {Request} request - The request object containing the review data.
 * @param {Response} response - The response object to send the results to the client.
 *
 * @return {Promise<Response>} The response object with the status and message of the operation.
 */

export async function createReviewsController(request: Request, response: Response): Promise<Response> {
    try {
        // validate the review data coming from the request body
        const validationResult = reviewSchema.safeParse(request.body);

        // if the validation is unsuccessful, return a preformatted response to the client
        if (!validationResult.success) {
            return response.status(400).json({ status: 400, message: validationResult.error.errors });
        }

        // deconstruct the review data from the request body
        const reviewData = validationResult.data;

        // create a new review ID
        reviewData.review_id = uuid();

        // insert the review into the database
        const insertResult = await insertReviews(reviewData);

        // if the insert is unsuccessful, return a response to the client
        if (!insertResult) {
            return response.status(500).json({ status: 500, message: 'Failed to create review' });
        }

        // return a response to the client
        return response.status(201).json({ status: 201, message: 'Review created successfully', data: reviewData });

    } catch (error: any) {
        // catch any errors that occurred during the review creation process and return a response to the client
        return response.status(500).json({ status: 500, message: error.message });
    }
}