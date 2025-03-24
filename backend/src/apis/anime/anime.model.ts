import {sql} from "../../utils/database.utils";

export async function getAnimeById(anime_jikan_id: number): Promise<any> {
    const rowList = await sql`
        SELECT *
        FROM anime
        WHERE anime_jikan_id = ${anime_jikan_id}`
    return rowList[0]
}

export async function deleteAllAnime(): Promise<any> {
    return sql`DELETE
               FROM anime`
}



export async function getAnimeRecent(): Promise<any> {
    return sql`
        SELECT anime_jikan_id, anime_title, anime_title_english, anime_score, anime_rank, anime_aired_start, anime_aired_end, anime_type
        FROM anime
        WHERE anime_aired_start IS NOT NULL AND anime_type != 'Movie'
        ORDER BY anime_aired_start DESC
        LIMIT 50`
}

export async function getAnimeTop(): Promise<any> {
    return sql`
        SELECT anime_title, anime_title_english, anime_score, anime_rank 
        FROM anime
        ORDER BY anime_rank
        LIMIT 50`
}

export async function getAnimeByGenre(genre: string): Promise<any> {
    return sql`
        SELECT anime_title, anime_title_english, anime_score, anime_rank, anime_genres
        FROM anime
        WHERE anime_genres ILIKE '%' || ${genre} || '%'
        ORDER BY anime_rank
        LIMIT 5`
}

export async function insertMultipleAnime(anime: any[]): Promise<boolean> {
    try {
        await sql`
            INSERT INTO anime (anime_id, anime_jikan_id, anime_aired_start, anime_aired_end, anime_broadcast,
                               anime_description, anime_demographic, anime_duration, anime_episodes,
                               anime_rating, anime_rank, anime_score,
                               anime_status, anime_title, anime_title_english, anime_title_japanese, anime_type, 
                               anime_trailer_url, anime_youtube_thumbnail_url, anime_thumbnail_url)
            VALUES
            ${sql(anime.map(anime => [
                anime.anime_id,
                anime.anime_jikan_id,
                anime.anime_aired_end,
                anime.anime_aired_start,
                anime.anime_broadcast,
                anime.anime_description,
                anime.anime_demographic,
                anime.anime_duration,
                anime.anime_episodes,
                anime.anime_rating,
                anime.anime_rank,
                anime.anime_score,
                anime.anime_status,
                anime.anime_title,
                anime.anime_title_english,
                anime.anime_title_japanese,
                anime.anime_type,
                anime.anime_trailer_url,
                anime.anime_youtube_thumbnail_url,
                anime.anime_thumbnail_url
            ]))}
        `
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}