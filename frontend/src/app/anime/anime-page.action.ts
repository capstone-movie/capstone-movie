'use server'

            /**
             * Fetches anime details from the server based on the provided URL.
             *
             * @param {string} url - The anime ID or URL segment to fetch details for.
             * @returns {Promise<any>} A promise that resolves to the fetched anime data.
             * @throws Will throw an error if the fetch operation fails.
             */
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

            /**
             * Fetches anime recommendations based on the provided genre or ID.
             *
             * @param {string} ids - The genre or ID to fetch recommendations for.
             * @returns {Promise<any>} A promise that resolves to the fetched recommendations data.
             * @throws Will throw an error if the fetch operation fails.
             */
            export async function fetchAnimeRecommendations(ids: string): Promise<any> {
                try {
                    const fullUrl = `${process.env.PUBLIC_API_URL}/apis/${ids}`
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

            /**
             * Fetches reviews for a specific anime based on its ID.
             *
             * @param {string} id - The anime ID to fetch reviews for.
             * @returns {Promise<any>} A promise that resolves to the fetched reviews data.
             * @throws Will throw an error if the fetch operation fails.
             */
            export async function fetchReviewByAnimeId(id: string): Promise<any> {
                try {
                    const fullUrl = `${process.env.PUBLIC_API_URL}/apis/review/get-by-anime/${id}`
                    const response = await fetch(fullUrl, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: null
                    })
                    return response.json()
                } catch (error) {
                    console.error('Error fetching reviews list:', error);
                    throw error; // Re-throw the error to be handled by the caller
                }
            }