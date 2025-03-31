import {sql} from "../../utils/database.utils";

export async function getAnimeById(anime_jikan_id: number): Promise<any> {
    const rowList = await sql`
        SELECT
            a.anime_id,
            a.anime_jikan_id,
            a.anime_aired_end,
            a.anime_aired_start,
            a.anime_broadcast,
            a.anime_description,
            a.anime_demographic,
            a.anime_duration,
            a.anime_episodes,
            a.anime_rating,
            a.anime_rank,
            a.anime_score,
            a.anime_status,
            a.anime_title,
            a.anime_title_english,
            a.anime_title_japanese,
            a.anime_type,
            a.anime_trailer_url,
            a.anime_youtube_thumbnail_url,
            a.anime_thumbnail_url,
            ARRAY(
                    SELECT g.genres_name, g.genres_id
                    FROM genres g
                             INNER JOIN anime_genres ag ON ag.anime_genres_genres_id = g.genres_id
                    WHERE ag.anime_genres_anime_id = a.anime_id
            ) AS genres
        FROM anime a
        WHERE a.anime_jikan_id = ${anime_jikan_id}
    `;

    return rowList[0]; // return the first record
}

export async function deleteAllAnime(): Promise<any> {
    return sql`DELETE
               FROM anime`
}

export async function getAnimeRecent(): Promise<any> {
    const rowList = await sql`
        SELECT 
            anime_id,
            anime_jikan_id, 
            anime_title, 
            anime_title_english, 
            anime_title_japanese, 
            anime_description, 
            anime_demographic, 
            anime_duration, 
            anime_episodes, 
            anime_rating, 
            anime_rank, 
            anime_score, 
            anime_status, 
            anime_type, 
            anime_broadcast, 
            anime_aired_start, 
            anime_aired_end, 
            anime_trailer_url, 
            anime_youtube_thumbnail_url, 
            anime_thumbnail_url,
            ARRAY(
                SELECT g.genres_name
                FROM genres g
                INNER JOIN anime_genres ag ON ag.anime_genres_genres_id = g.genres_id
                WHERE ag.anime_genres_anime_id = a.anime_id
            ) AS genres
        FROM anime a
        WHERE anime_aired_start IS NOT NULL 
          AND anime_type != 'Movie'
        ORDER BY anime_aired_start DESC
        LIMIT 50
    `;
    return rowList; // Return the list of anime records
}


export async function getAnimeTop(): Promise<any> {
    const rowList = await sql`
        SELECT 
            anime_id,
            anime_jikan_id, 
            anime_title, 
            anime_title_english, 
            anime_title_japanese, 
            anime_description, 
            anime_demographic, 
            anime_duration, 
            anime_episodes, 
            anime_rating, 
            anime_rank, 
            anime_score, 
            anime_status, 
            anime_type, 
            anime_broadcast, 
            anime_aired_start, 
            anime_aired_end, 
            anime_trailer_url, 
            anime_youtube_thumbnail_url, 
            anime_thumbnail_url,
            ARRAY(
                SELECT g.genres_name
                FROM genres g
                INNER JOIN anime_genres ag ON ag.anime_genres_genres_id = g.genres_id
                WHERE ag.anime_genres_anime_id = a.anime_id
            ) AS genres
        FROM anime a
        ORDER BY anime_rank
        LIMIT 50
    `;
    return rowList; // Return the list of top anime records
}

/*export async function getAnimeByGenre(genre: string): Promise<any> {
    return sql`
        SELECT anime_title, anime_title_english, anime_score, anime_rank, anime_genres
        FROM anime
        WHERE anime_genres ILIKE '%' || ${genre} || '%'
        ORDER BY anime_rank
        LIMIT 5`
}*/

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

export async function insertAnime(anime: any): Promise<boolean> {
    try {

        const a = anime;
        console.log(a.anime_title_japanese)
        await sql`
            INSERT INTO anime (anime_id, anime_jikan_id, anime_aired_start, anime_aired_end, anime_broadcast,
                               anime_description, anime_demographic, anime_duration, anime_episodes,
                               anime_rating, anime_rank, anime_score,
                               anime_status, anime_title, anime_title_english, anime_title_japanese, anime_type, 
                               anime_trailer_url, anime_youtube_thumbnail_url, anime_thumbnail_url)
            VALUES (
                ${a.anime_id},
                ${a.anime_jikan_id},
                ${a.anime_aired_start},
                ${a.anime_aired_end},
                ${a.anime_broadcast},
                ${a.anime_description},
                ${a.anime_demographic},
                ${a.anime_duration},
                ${a.anime_episodes},
                ${a.anime_rating},
                ${a.anime_rank},
                ${a.anime_score},
                ${a.anime_status},
                ${a.anime_title},
                ${a.anime_title_english},
                ${a.anime_title_japanese},
                ${a.anime_type},
                ${a.anime_trailer_url},
                ${a.anime_youtube_thumbnail_url},
                ${a.anime_thumbnail_url}
            )
        `;

    return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getAnimeSearch(query: string): Promise<any> {
    const rowList = await sql`
        SELECT *
        FROM anime a
        WHERE (a.anime_title ILIKE '%' || ${query} || '%'
            OR a.anime_title_english ILIKE '%' || ${query} || '%'
            OR a.anime_title_japanese ILIKE '%' || ${query} || '%')
          AND a.anime_score IS NOT NULL
        ORDER BY a.anime_score DESC
            LIMIT 50
    `;
    return rowList; // Return the list of anime records matching the search query
}