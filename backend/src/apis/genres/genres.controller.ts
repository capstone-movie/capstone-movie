import {Request, Response} from "express";
import {getAllAnimeByGenresName, getAllGenres} from "./genres.model";

export async function getAllGenresController(request: Request, response: Response): Promise<any> {
    const result = await getAllGenres()
    return response.status(200).json(result)
}

export async function getAnimeByGenreNameController(request: Request, response: Response): Promise<any> {
    const {genresName} = request.params
    let page = request.query['page'];
    if (!page || isNaN(Number(page)) || typeof page !== "string")
        page = '0'
    const result = await getAllAnimeByGenresName(genresName, Math.max(0, parseInt(page)))
    if (!result) {
        return response.status(400).json('Anime not found')
    }
    return response.status(200).json(result)
}
