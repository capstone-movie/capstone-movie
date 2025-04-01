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
        SELECT w.watch_list_anime_id,
               w.watch_list_profile_id,
               w.watch_list_rank,
               a.anime_thumbnail_url,
               a.anime_title_english,
               a.anime_score
        FROM watch_list_favorite w
                 JOIN anime a
                      ON w.watch_list_anime_id = a.anime_id
        WHERE w.watch_list_profile_id = ${profileId}::UUID
        ORDER BY w.watch_list_rank;
    `;
    return result;
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
        SELECT w.watch_list_anime_id,
               w.watch_list_profile_id,
               w.watch_list_rank,
               a.anime_thumbnail_url,
               a.anime_title_english,
               a.anime_score
        FROM watch_list_hidden w
                 JOIN anime a
                      ON w.watch_list_anime_id = a.anime_id
        WHERE w.watch_list_profile_id = ${profileId}::UUID
        ORDER BY w.watch_list_rank;
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
        SELECT w.watch_list_anime_id,
               w.watch_list_profile_id,
               w.watch_list_rank,
               a.anime_thumbnail_url,
               a.anime_title_english,
               a.anime_score
        FROM watch_list_later w
                 JOIN anime a
                      ON w.watch_list_anime_id = a.anime_id
        WHERE w.watch_list_profile_id = ${profileId}::UUID
        ORDER BY w.watch_list_rank;
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