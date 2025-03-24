import {sql} from "../../utils/database.utils";


export async function insertGenres(uuid: string, genre: string) {
    await sql`INSERT INTO genres(genres_id, genres_name)
              VALUES (${uuid}, ${genre})`
    return 'Genres Successfully Created'
}

export async function insertMultipleAnimeGenres(anime: string, genre_ids: string) {
    await sql`INSERT INTO anime_genres(anime_genres_anime_id, anime_genres_genres_id)
              VALUES (${anime}, ${genre_ids})`
    return 'Anime Genres Successfully Created'
}

export async function getAllGenres(): Promise<any> {
    return sql`SELECT genres_name, genres_id
               FROM genres`
}

export async function getAllAnimeByGenresName(genreName: string, page: number): Promise<any> {
    return sql`
        SELECT a.anime_id,
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
               a.anime_thumbnail_url
        FROM anime a
                 JOIN anime_genres ag ON a.anime_id = ag.anime_genres_anime_id
                 JOIN genres g ON ag.anime_genres_genres_id = g.genres_id
        WHERE g.genres_name = ${genreName}
        ORDER BY a.anime_rank
        LIMIT 50 OFFSET ${(page * 50)};
    `;
}

export async function deleteAllGenres(): Promise<any> {
    return sql`DELETE
               FROM genres`
}

export async function deleteAllAnimeGenres(): Promise<any> {
    return sql`DELETE
               FROM anime_genres`
}