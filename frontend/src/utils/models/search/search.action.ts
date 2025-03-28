'use server'

import { Status } from '@/utils/interfaces/Status'

export async function searchAnime(query: string): Promise<Status> {
    if(query){
        const response = await fetch(`${process.env.PUBLIC_API_URL}/apis/anime/search/${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        })
        return response.json().then((response) => {
            return response
        }).catch((error) => {
            console.error(error)
            throw error
        })
    }else{
        return "no"
    }
}

