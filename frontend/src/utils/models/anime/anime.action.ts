'use server'

export async function fetchAnimeByAnimeId(animeId: string) : Promise<any> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/anime/${animeId}`,
        {
            method: 'get',
            headers: {
                'Content-type': 'application/json'
            }
        }) .then(response => {
        if( !response.ok) {
            throw new Error('request failed')
        }
        return response.json()
    })
    return data
}