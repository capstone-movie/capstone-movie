import {Request, Response} from 'express'
import {
    getAnimeByIdSchema
} from './anime.validator'
import {zodErrorResponse} from "../../utils/response.utils";
import {getAnimeRecent, getAnimeTop, getAnimeById, getAnimeSearch} from "./anime.model";

export async function getAnimeByIdController(request: Request, response: Response): Promise<any> {
    const validationResult = getAnimeByIdSchema.safeParse(request.params)
    if(!validationResult.success){
        return zodErrorResponse(response,validationResult.error)
    }
    const {animeId} = validationResult.data
    const anime_id_num = parseInt(animeId)
    const result = await getAnimeById(anime_id_num)
    if(!result){
        return response.status(400).json('Anime not found')
    }
    return response.status(200).json(result)
}
export async function getAnimeRecentController(request: Request, response: Response): Promise<any> {
    const result = await getAnimeRecent()
    if(!result){
        return response.status(400).json('Anime not found')
    }
    return response.status(200).json(result)
}
export async function getAnimeTopController(request: Request, response: Response): Promise<any> {
    const result = await getAnimeTop()
    if(!result){
        return response.status(400).json('Anime not found')
    }
    return response.status(200).json(result)
}

export async function getAnimeSearchController(request: Request, response: Response): Promise<Response> {
    const query = request.params['query'];
    if (!query) {
        return response.status(400).json({ message: 'Query parameter is required' });
    }

    try {
        const result = await getAnimeSearch(query);
        if (!result || result.length === 0) {
            return response.status(404).json({ message: 'Anime not found' });
        }
        return response.status(200).json(result);
    } catch (error) {
        console.error('Error executing anime search:', error);
        return response.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}
/*export async function getAnimeByGenreController(request: Request, response: Response): Promise<any> {
    const {genres} = request.params
    const result = await getAnimeByGenre(genres)
    if(!result){
        return response.status(400).json('Anime not found')
    }
    return response.status(200).json(result)
}*/
