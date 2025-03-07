'use client'

import { useSearchParams } from 'next/navigation';
import { GridView } from "@/app/category/grid-view"; // Assuming GridView is the component you want to use

export default function CategoryPage() {
    const searchParams = useSearchParams();
    const type = searchParams.get('type'); // Directly getting the query parameter

    // Set the appropriate URL based on the query parameter
    let apiUrl = '';
    let title = '';

    switch (type) {
        case 'recent':
            apiUrl = 'https://api.jikan.moe/v4/seasons/now?sfw';
            title = 'Recent Anime';
            break;
        case 'recommended':
            apiUrl = 'https://api.jikan.moe/v4/top/anime?sfw&page=2';
            title = 'Recommended Anime';
            break;
        default:
            apiUrl = 'https://api.jikan.moe/v4/top/anime?sfw';
            title = 'Popular Anime';
            break;
    }

    return (
        <>
            <GridView url={apiUrl} title={title} />
        </>
    );
}
