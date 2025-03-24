import {sql} from "../../utils/database.utils";
import {z} from 'zod';
import {watchListSchema} from "./watch-list.validator";

export async function addWatchListFavorite(entry: any): Promise<boolean> {
    await sql`
        INSERT INTO watch_list_favorite (watch_list_anime_id, watch_list_profile_id, watch_list_rank)
        VALUES (${entry.watchListAnimeId}::UUID, ${entry.watchListProfileId}::UUID, ${entry.watchListRank})
        ON CONFLICT (watch_list_anime_id, watch_list_profile_id)
            DO UPDATE SET watch_list_rank = EXCLUDED.watch_list_rank
    `;
    return true;
}
export async function getWatchListFavorite(profileId: string): Promise<any[]> {
    const result = await sql`
        SELECT
            wlf.watch_list_anime_id,
            wlf.watch_list_profile_id,
            wlf.watch_list_rank,
            a.anime_id,
            a.anime_jikan_id,
            a.anime_title,
            a.anime_title_english,
            a.anime_title_japanese,
            a.anime_description,
            a.anime_demographic,
            a.anime_duration,
            a.anime_episodes,
            a.anime_rating,
            a.anime_rank,
            a.anime_score,
            a.anime_status,
            a.anime_type,
            a.anime_broadcast,
            a.anime_aired_start,
            a.anime_aired_end,
            a.anime_trailer_url,
            a.anime_youtube_thumbnail_url,
            a.anime_thumbnail_url,
            ARRAY(
                    SELECT g.genres_name
                    FROM genres g
                             INNER JOIN anime_genres ag ON ag.anime_genres_genres_id = g.genres_id
                    WHERE ag.anime_genres_anime_id = a.anime_id
            ) AS genres
        FROM watch_list_favorite wlf
                 INNER JOIN anime a ON wlf.watch_list_anime_id = a.anime_id
        WHERE wlf.watch_list_profile_id = ${profileId}::UUID
        ORDER BY wlf.watch_list_rank;
    `;

    // Return an array where each item contains both the anime information and the corresponding watch_list_favorite data
    return result.map((anime: any) => ({
        watch_list_favorite: {
            watch_list_anime_id: anime.watch_list_anime_id,
            watch_list_profile_id: anime.watch_list_profile_id,
            watch_list_rank: anime.watch_list_rank,
        },
        anime_details: {
            anime_id: anime.anime_id,
            anime_jikan_id: anime.anime_jikan_id,
            anime_title: anime.anime_title,
            anime_title_english: anime.anime_title_english,
            anime_title_japanese: anime.anime_title_japanese,
            anime_description: anime.anime_description,
            anime_demographic: anime.anime_demographic,
            anime_duration: anime.anime_duration,
            anime_episodes: anime.anime_episodes,
            anime_rating: anime.anime_rating,
            anime_rank: anime.anime_rank,
            anime_score: anime.anime_score,
            anime_status: anime.anime_status,
            anime_type: anime.anime_type,
            anime_broadcast: anime.anime_broadcast,
            anime_aired_start: anime.anime_aired_start,
            anime_aired_end: anime.anime_aired_end,
            anime_trailer_url: anime.anime_trailer_url,
            anime_youtube_thumbnail_url: anime.anime_youtube_thumbnail_url,
            anime_thumbnail_url: anime.anime_thumbnail_url,
            genres: anime.genres,
        }
    }));
}

export async function deleteWatchListFavorite(watchListAnimeId: string, profileId: string): Promise<boolean> {
    await sql`
        DELETE
        FROM watch_list_favorite
        WHERE watch_list_anime_id = ${watchListAnimeId}::UUID
          AND watch_list_profile_id = ${profileId}::UUID;
    `;
    return true;
}

export async function addWatchListHidden(entry: any): Promise<boolean> {
    await sql`
        INSERT INTO watch_list_hidden (watch_list_anime_id, watch_list_profile_id, watch_list_rank)
        VALUES (${entry.watchListAnimeId}::UUID, ${entry.watchListProfileId}::UUID, ${entry.watchListRank})
        ON CONFLICT (watch_list_anime_id, watch_list_profile_id)
            DO UPDATE SET watch_list_rank = EXCLUDED.watch_list_rank
    `;
    return true;
}
export async function getWatchListHidden(profileId: string): Promise<any[]> {
    const result = await sql`
        SELECT *
        FROM watch_list_hidden
        WHERE watch_list_profile_id = ${profileId}::UUID
        ORDER BY watch_list_rank;
    `;
    return result;
}
export async function deleteWatchListHidden(watchListAnimeId: string, profileId: string): Promise<boolean> {
    await sql`
        DELETE
        FROM watch_list_hidden
        WHERE watch_list_anime_id = ${watchListAnimeId}::UUID
          AND watch_list_profile_id = ${profileId}::UUID;
    `;
    return true;
}

export async function addWatchListLater(entry: any): Promise<boolean> {
    await sql`
        INSERT INTO watch_list_later (watch_list_anime_id, watch_list_profile_id, watch_list_rank)
        VALUES (${entry.watchListAnimeId}::UUID, ${entry.watchListProfileId}::UUID, ${entry.watchListRank})
        ON CONFLICT (watch_list_anime_id, watch_list_profile_id)
            DO UPDATE SET watch_list_rank = EXCLUDED.watch_list_rank
    `;
    return true;
}
export async function getWatchListLater(profileId: string): Promise<any[]> {
    const result = await sql`
        SELECT *
        FROM watch_list_later
        WHERE watch_list_profile_id = ${profileId}::UUID
        ORDER BY watch_list_rank;
    `;
    return result;
}
export async function deleteWatchListLater(watchListAnimeId: string, profileId: string): Promise<boolean> {
    await sql`
        DELETE
        FROM watch_list_later
        WHERE watch_list_anime_id = ${watchListAnimeId}::UUID
          AND watch_list_profile_id = ${profileId}::UUID;
    `;
    return true;
}