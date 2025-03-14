import {Request, Response} from 'express'
import {
    animeSchema
} from './anime.validator'
import {v7 as uuid} from 'uuid'
import {
    insertReviews,
    updateReviews,
    deleteReviews,
    getProfileIdByReviewId,
    getReviewsByProfileId,
    getReviewsByAnimeId
} from "./anime.model";

export async function getAnimeController(request: Request, response: Response): Promise<any> {
    const {anime_id} = request.body
    // Validate the request body against the schema
    if (!animeIdSchema.safeParse({anime_id}).success) {
        return response.status(400).json({error: 'Invalid anime ID format'})
    }
    const anime = await animeSchema.parseAsync({anime_id})
    return response.status(200).json(anime)
}
