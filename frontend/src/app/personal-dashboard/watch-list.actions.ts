'use server'

import {setHeaders} from "@/utils/set-headers.utils";
import {getSession} from "@/utils/auth.utils";

export async function addWatchList({animeId, animeRank, apiEndpoint}: {
    animeId: string,
    animeRank: number,
    apiEndpoint: string
}): Promise<any> {
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

export async function getWatchListServerAction(apiEndpoint: string): Promise<any> {

    try {
        const fullUrl = `${process.env.PUBLIC_API_URL}/apis/watch-list/${apiEndpoint}`
        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: await setHeaders(),
            body: null
        })
        return response.json()
    } catch (error) {
        console.error('Error fetching watch list:', error);
        throw error;
    }
}


export async function deleteWatchListServerAction(apiEndpoint: string, animeId: string): Promise<any> {
    try {
        const fullUrl = `${process.env.PUBLIC_API_URL}/apis/watch-list/${apiEndpoint}`
        const response = await fetch(fullUrl, {
            method: 'DELETE',
            headers: await setHeaders(),
            body: JSON.stringify({
                "watchListAnimeId": animeId
            })
        })
        return response.json()
    } catch (error) {
        console.error('Error fetching watch list:', error);
        throw error;
    }
}

