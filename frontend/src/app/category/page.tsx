'use client'

import { useSearchParams } from 'next/navigation';
import { GridView } from "@/app/category/grid-view"; // Assuming GridView is the component you want to use

export default function CategoryPage() {
    const searchParams = useSearchParams();
    const type = searchParams.get('type'); // Directly getting the query parameter
    let apiUrl = '';
    let title = '';
    switch (type) {
        case 'recent':
            apiUrl = 'anime/recent';
            title = 'Recent Anime';
            break;
        case 'recommended':
            apiUrl = 'genres/Action';
            title = 'Recommended Anime';
            break;
        default:
            apiUrl = 'anime/top';
            title = 'Popular Anime';
            break;
    }
    return (
        <>
            <GridView url={apiUrl} title={title} />
        </>
    );
}
