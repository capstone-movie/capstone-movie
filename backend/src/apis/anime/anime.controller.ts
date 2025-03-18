import {Request, Response} from 'express'
import {
    getAnimeByIdSchema
} from './anime.validator'
import {zodErrorResponse} from "../../utils/response.utils";
import {getAnimeById} from "./anime.model";

export async function getAnimeByIdController(request: Request, response: Response): Promise<any> {

    const validationResult = getAnimeByIdSchema.safeParse(request.params)
    if(!validationResult.success){
        return zodErrorResponse(response,validationResult.error)
    }
    const {anime_id} = validationResult.data
    const anime_id_num = parseInt(anime_id)

    const result = await getAnimeById(anime_id_num)

    console.log(result)

    return response.status(200).json(anime_id_num)
}
