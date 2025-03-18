import {sql} from "../../utils/database.utils";

export async function getAnimeById(anime_jikan_id: number): Promise<any> {
    const rowList = await sql`
        SELECT *
        FROM anime
        WHERE anime_jikan_id = ${anime_jikan_id}`
    return rowList[0]
}

export async function deleteAllAnime(): Promise<boolean> {
    await sql`DELETE
              FROM anime`
    return true
}

export async function insertMultipleAnime(anime: any[]): Promise<boolean> {
    try {
        await sql`
            INSERT INTO anime (anime_id, anime_jikan_id, anime_aired_start, anime_aired_end, anime_broadcast,
                               anime_description, anime_demographic, anime_duration, anime_episodes,
                               anime_themes, anime_genres, anime_rating, anime_rank, anime_score,
                               anime_status, anime_title, anime_title_english, anime_title_japanese, anime_type)
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
                anime.anime_themes,
                anime.anime_genres,
                anime.anime_rating,
                anime.anime_rank,
                anime.anime_score,
                anime.anime_status,
                anime.anime_title,
                anime.anime_title_english,
                anime.anime_title_japanese,
                anime.anime_type
            ]))}
        `;
        return true;
    } catch (error) {
        console.log(error)
        return false
    }
}