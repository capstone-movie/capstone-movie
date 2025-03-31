'use server'

export async function fetchAnimePage(url: string): Promise<any> {
    try {
        const fullUrl = `${process.env.PUBLIC_API_URL}/apis/anime/id/${url}`
        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        })
        return response.json()
    } catch (error) {
        console.error('Error fetching anime:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}