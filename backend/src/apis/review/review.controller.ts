import {Request, Response} from 'express'
import {
    deleteReviewSchema,
    reviewSchema,
    getReviewsByProfileIdSchema,
    getReviewsByAnimeIdSchema
} from './review.validator'
import {v7 as uuid} from 'uuid'
import {
    insertReviews,
    updateReviews,
    deleteReviews,
    getProfileIdByReviewId,
    getReviewsByProfileId,
    getReviewsByAnimeId
} from "./review.model";

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

export async function createReviewController(request: Request, response: Response): Promise<Response> {
    try {
        // validate the review data coming from the request body
        const validationResult = reviewSchema.safeParse(request.body);

        // if the validation is unsuccessful, return a preformatted response to the client
        if (!validationResult.success) {
            return response.status(400).json({status: 400, message: validationResult.error.errors});
        }

        // deconstruct the review data from the request body
        const reviewData = validationResult.data;

        // create a new review ID
        reviewData.reviewId = uuid();

        // insert the review into the database
        const insertResult = await insertReviews(reviewData);

        // if the insert is unsuccessful, return a response to the client
        if (!insertResult) {
            return response.status(500).json({status: 500, message: 'Failed to create review'});
        }

        // return a response to the client
        return response.status(201).json({status: 201, message: 'Review created successfully', data: reviewData});

    } catch (error: any) {
        // catch any errors that occurred during the review creation process and return a response to the client
        return response.status(500).json({status: 500, message: error.message});
    }
}

export async function updateReviewController(request: Request, response: Response): Promise<Response> {
    try {
        // validate the review data coming from the request body
        const validationResult = reviewSchema.safeParse(request.body);

        // if the validation is unsuccessful, return a preformatted response to the client
        if (!validationResult.success) {
            return response.status(400).json({status: 400, message: validationResult.error.errors});
        }

        // deconstruct the review data from the request body
        const reviewData = validationResult.data;

        // insert the review into the database
        const insertResult = await updateReviews(reviewData);

        // if the insert is unsuccessful, return a response to the client
        if (!insertResult) {
            return response.status(500).json({status: 500, message: 'Failed to update review'});
        }

        // return a response to the client
        return response.status(201).json({status: 201, message: 'Review created successfully', data: reviewData});

    } catch (error: any) {
        // catch any errors that occurred during the review creation process and return a response to the client
        return response.status(500).json({status: 500, message: error.message});
    }
}

/**
 * Delete Review Controller
 *
 * This controller handles the deletion of reviews. It utilizes the DeleteReviewSchema from zod
 * to validate the structure and content of the review ID coming from the request body.
 * Each review is identified by a unique UUID.
 *
 * @param {Request} request - The request object containing the review ID.
 * @param {Response} response - The response object to send the results to the client.
 *
 * @return {Promise<Response>} The response object with the status and message of the operation.
 */
export async function deleteReviewController(request: Request, response: Response): Promise<Response> {
    try {
        // validate the review ID coming from the request body
        const validationResult = deleteReviewSchema.safeParse(request.body);

        // if the validation is unsuccessful, return a preformatted response to the client
        if (!validationResult.success) {
            return response.status(400).json({status: 400, message: validationResult.error.errors});
        }

        // deconstruct the review ID from the request body
        const {reviewId} = validationResult.data;

        const profileId = await getProfileIdByReviewId(reviewId);

        //check if session is currently the author of this review
        const isAuthor = request.session.profile?.profileId === profileId;

        if (!isAuthor) {
            return response.status(403).json({status: 403, message: 'You are not authorized to delete this review'});
        }

        // delete the review from the database
        const deleteResult = await deleteReviews(reviewId);

        // if the delete is unsuccessful, return a response to the client
        if (!deleteResult) {
            return response.status(500).json({status: 500, message: 'Failed to delete review'});
        }

        // return a response to the client
        return response.status(200).json({status: 200, message: 'Review deleted successfully'});

    } catch (error: any) {
        // catch any errors that occurred during the review deletion process and return a response to the client
        return response.status(500).json({status: 500, message: error.message});
    }
}

export async function getReviewsByProfileIdController(request: Request, response: Response): Promise<Response> {
    try {
        // validate the profile ID coming from the request body
        const validationResult = getReviewsByProfileIdSchema.safeParse(request.body);

        console.log(validationResult);
        // if the validation is unsuccessful, return a preformatted response to the client
        if (!validationResult.success) {
            return response.status(400).json({status: 400, message: validationResult.error.errors});
        }

        // deconstruct the profile ID from the request body
        const {profileId} = validationResult.data;

        // get the reviews from the database
        const reviews = await getReviewsByProfileId(profileId);

        // if there are no reviews, return a response to the client
        if (reviews.length === 0) {
            return response.status(404).json({status: 404, message: 'No reviews found'});
        }

        // return a response to the client
        return response.status(200).json({status: 200, message: 'Reviews retrieved successfully', data: reviews});

    } catch (error: any) {
        // catch any errors that occurred during the review retrieval process and return a response to the client
        return response.status(500).json({status: 500, message: error.message});
    }
}

export async function getReviewsByAnimeIdController(request: Request, response: Response): Promise<Response> {
    try {
        // validate the anime ID coming from the request body
        const validationResult = getReviewsByAnimeIdSchema.safeParse(request.body);

        // if the validation is unsuccessful, return a preformatted response to the client
        if (!validationResult.success) {
            return response.status(400).json({status: 400, message: validationResult.error.errors});
        }

        // deconstruct the anime ID from the request body
        const {animeId} = validationResult.data;

        // get the reviews from the database
        const reviews = await getReviewsByAnimeId(animeId);

        // if there are no reviews, return a response to the client
        if (reviews.length === 0) {
            return response.status(404).json({status: 404, message: 'No reviews found'});
        }

        // return a response to the client
        return response.status(200).json({status: 200, message: 'Reviews retrieved successfully', data: reviews});

    } catch (error: any) {
        // catch any errors that occurred during the review retrieval process and return a response to the client
        return response.status(500).json({status: 500, message: error.message});
    }
}