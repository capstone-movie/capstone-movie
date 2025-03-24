import {sql} from "../../utils/database.utils";


export async function insertGenres(uuid, genre) {
    await sql`INSERT INTO genres(genres_id, genres_name)
              VALUES (${uuid}, ${genre})`
    return 'Genres Successfully Created'
}

export async function insertMultipleAnimeGenres(anime, genre_ids){
        await sql`INSERT INTO anime_genres(anime_genres_anime_id, anime_genres_genres_id)
                  VALUES (${anime}, ${genre_ids})`
    return 'Anime Genres Successfully Created'
}

export async function deleteAllGenres(): Promise<any> {
    return sql`DELETE
               FROM genres`
}

export async function deleteAllAnimeGenres(): Promise<any> {
    return sql`DELETE
               FROM anime_genres`
}