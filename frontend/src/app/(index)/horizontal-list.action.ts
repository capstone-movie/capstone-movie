'use server'

export async function fetchHorizontalList(url: string): Promise<any> {
    try {
        const response = await fetch(`${process.env.PUBLIC_API_URL}/apis/anime/${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        })
        return response.json()
    } catch (error) {
        console.error('Error fetching horizontal list:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}