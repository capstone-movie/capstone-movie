import {useEffect, useState} from "react";
import {ListItem} from "@/app/(index)/list-item";
import {ListHeader} from "@/app/(index)/list-header";

type MyAnimeResponse = {
    data: {
        mal_id: number;
        url: string;
        images: {
            jpg: {
                image_url: string;
                small_image_url: string;
                large_image_url: string;
            };
            webp: {
                image_url: string;
                small_image_url: string;
                large_image_url: string;
            };
        };
        trailer: {
            youtube_id: string;
            url: string;
            embed_url: string;
        };
        approved: boolean;
        titles: {
            type: string;
            title: string;
        }[];
        title: string;
        title_english: string;
        title_japanese: string;
        title_synonyms: string[];
        type: string;
        source: string;
        episodes: number;
        status: string;
        airing: boolean;
        aired: {
            from: string;
            to: string;
            prop: {
                from: {
                    day: number;
                    month: number;
                    year: number;
                };
                to: {
                    day: number;
                    month: number;
                    year: number;
                };
                string: string;
            };
        };
        duration: string;
        rating: string;
        score: number;
        scored_by: number;
        rank: number;
        popularity: number;
        members: number;
        favorites: number;
        synopsis: string;
        background: string;
        season: string;
        year: number;
        broadcast: {
            day: string;
            time: string;
            timezone: string;
            string: string;
        };
        producers: {
            mal_id: number;
            type: string;
            name: string;
            url: string;
        }[];
        licensors: {
            mal_id: number;
            type: string;
            name: string;
            url: string;
        }[];
        studios: {
            mal_id: number;
            type: string;
            name: string;
            url: string;
        }[];
        genres: {
            mal_id: number;
            type: string;
            name: string;
            url: string;
        }[];
        explicit_genres: {
            mal_id: number;
            type: string;
            name: string;
            url: string;
        }[];
        themes: {
            mal_id: number;
            type: string;
            name: string;
            url: string;
        }[];
        demographics: {
            mal_id: number;
            type: string;
            name: string;
            url: string;
        }[];
    }[];
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
        items: {
            count: number;
            total: number;
            per_page: number;
        };
    };
};

type HorizontalListProps = {
    url: string
    title: string
}

export function HorizontalList(prop: HorizontalListProps) {

    const [animeResponse, setAnimeResponse] = useState<MyAnimeResponse>()

    const initialEffects = () => {
        fetch(prop.url)
            .then(response => response.json())
            .then(json => setAnimeResponse(json))
    }
    useEffect(initialEffects, [setAnimeResponse])

    return (
        <>
            <div className={'bg-black h-fit'}>
                <ListHeader text={prop.title}/>
                <div className={'bg-black h-fit flex overflow-x-scroll gap-4 overflow-y-hidden'}>
                    {
                        animeResponse &&
                        animeResponse.data &&
                        animeResponse.data.map((anime, index) => (
                            <div className={'h-[30vh] aspect-[2/3]'}
                                 key={index}>
                                <ListItem title={anime.title}
                                          url={anime.images.webp.large_image_url}/>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}