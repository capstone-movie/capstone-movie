'use client'

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { GridView } from "@/app/category/grid-view"; // Assuming GridView is the component you want to use

export default function CategoryPage() {
    const searchParams = useSearchParams();

    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const type = searchParams.get('type'); // Directly getting the query parameter
    const query = searchParams.get('query') || '';

    let apiUrl = '';
    let title = '';
    switch (type) {
        case 'recent':
            apiUrl = 'anime/recent';
            title = 'Recent Anime';
            break;
        case 'popular':
            apiUrl = 'anime/top';
            title = 'Popular Anime';
            break;
        case 'recommended':
            apiUrl = 'genres/Action';
            title = 'Recommended Anime';
            break;
        case 'search':
            apiUrl = `anime/search/${query}`;
            title = 'Search Results: ' + query;
            break;
        default:
            apiUrl = `genres/${type}`;
            title = `${type}`;
            break;
    }

    return (
        <>
            <GridView url={apiUrl} title={title} />
        </>
    );
}
