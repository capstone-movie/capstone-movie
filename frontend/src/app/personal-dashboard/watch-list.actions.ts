'use server'

import {setHeaders} from "@/utils/set-headers.utils";

export async function addWatchList({ animeId, animeRank, apiEndpoint}: { animeId: string, animeRank: number, apiEndpoint: string}): Promise<any> {
    try {
        const fullUrl = `${process.env.PUBLIC_API_URL}/apis/watch-list/${apiEndpoint}`;
        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: await setHeaders(),
            body: JSON.stringify({
                'watchListAnimeId': animeId,
                'watchListRank': animeRank
            })
        });
        if (!response.ok) {
            console.log('You are not logged in');
        }
        return response.json();

    } catch (error) {
        console.error('Error adding to watchlist:', error);
        throw error;
    }
}
