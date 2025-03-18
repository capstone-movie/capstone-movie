import {z} from 'zod'
import {animeSchema} from './anime.validator'
import {sql} from "../../utils/database.utils";

export async function getAnimeById(anime_id: number): Promise<any> {
    const rowList = await sql`
        SELECT *
        FROM anime
        WHERE anime_id = ${anime_id}`
    return rowList[0]
}