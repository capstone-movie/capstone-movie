'use server'

import { Status } from '@/utils/interfaces/Status'

export async function searchAnime(query: string): Promise<Status> {
    if (!query) {
        return {
            status: 200,
            message: 'Query parameter is required',
            data: []
        };
    }

    try {
        const response = await fetch(`${process.env.PUBLIC_API_URL}/apis/anime/search/${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        return data as Status;
    } catch (error) {
        console.error("searchAnime error:", error);
        return {
            status: 200,
            message: 'Failed to fetch data',
            data: []
        };
    }
}
