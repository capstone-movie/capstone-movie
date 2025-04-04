'use server'

export async function fetchAllGenres(): Promise<any> {
    try {
        const fullUrl = `${process.env.PUBLIC_API_URL}/apis/genres/all`
        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        })
        return response.json()
    } catch (error) {
        console.error('Error fetching genres list:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}