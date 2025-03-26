'use server'

export async function fetchHorizontalList(url: string): Promise<any> {
    try {
        const fullUrl = `${process.env.PUBLIC_API_URL}/apis/${url}`
        const response = await fetch(fullUrl, {
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