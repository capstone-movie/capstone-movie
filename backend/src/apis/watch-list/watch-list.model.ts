import {sql} from "../../utils/database.utils";
import { z } from 'zod';
import { watchListSchema } from "./watch-list.validator";

export async function insertWatchList(watchListData: z.infer<typeof watchListSchema>): Promise<boolean> {
    const {
        watchListAnimeId,
        watchListProfileId,
        watchListFavorite = 0,
        watchListHidden = 0,
        watchListLater = 0,
    } = watchListData;
    await sql`
    INSERT INTO watch_list (watch_list_anime_id, watch_list_profile_id, watch_list_favorite, watch_list_hidden, watch_list_later)
    VALUES (${watchListAnimeId}::UUID, ${watchListProfileId}::UUID, ${watchListFavorite}, ${watchListHidden}, ${watchListLater})
    ON CONFLICT (watch_list_anime_id, watch_list_profile_id)
    DO UPDATE SET
        watch_list_favorite = EXCLUDED.watch_list_favorite,
        watch_list_hidden = EXCLUDED.watch_list_hidden,
        watch_list_later = EXCLUDED.watch_list_later;
`;
    return true;
}
export async function updateWatchListEntry(watchListData: z.infer<typeof watchListSchema>): Promise<boolean> {
    const {
        watchListAnimeId,
        watchListProfileId,
        watchListFavorite = 0,
        watchListHidden = 0,
        watchListLater = 0,
    } = watchListData;
    await sql`
        UPDATE watch_list
        SET
            watch_list_favorite = ${watchListFavorite},
            watch_list_hidden = ${watchListHidden},
            watch_list_later = ${watchListLater}
        WHERE watch_list_anime_id = ${watchListAnimeId}::UUID
          AND watch_list_profile_id = ${watchListProfileId}::UUID;
    `;
    return true;
}
export async function deleteWatchListEntry(watchListAnimeId: string, watchListProfileId:string): Promise<boolean> {
    await sql`
        DELETE FROM watch_list
        WHERE watch_list_anime_id = ${watchListAnimeId}::UUID
          AND watch_list_profile_id = ${watchListProfileId}::UUID;
    `;
    return true;
}
export async function getWatchListByProfileId(profileId: string): Promise<any[]> {
    const result = await sql`
        SELECT * FROM watch_list
        WHERE watch_list_profile_id = ${profileId}::UUID;
    `;
    return result;
}
export async function getWatchListEntry(watchListAnimeId: string, watchListProfileId: string): Promise<any | null> {
    const result = await sql`
        SELECT * FROM watch_list
        WHERE watch_list_anime_id = ${watchListAnimeId}::UUID 
        AND watch_list_profile_id = ${watchListProfileId}::UUID
    `;
    return result.length > 0 ? result[0] : null;
}