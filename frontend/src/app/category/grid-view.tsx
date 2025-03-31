'use client'

import {useEffect, useState} from "react";
import Link from "next/link";  // Import Link from next/link
import {fetchHorizontalList} from "@/app/(index)/horizontal-list.action";

type Response = {
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

type Props = {
    url: string
    title: string
}

export function GridView(prop: Props) {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchHorizontalList(prop.url)
            setData(result)
        };
        fetchData().then(() => {
        });
    }, [prop.url]);

    console.log(data)

    return (
        <>
            <p className={'text-white text-3xl w-fit mx-auto p-4'}>
                {prop.title}
            </p>
            <div className={' bg-bgcolor flex flex-wrap justify-center'}>
                {
                    data &&
                    data.map((anime: any, index: number) => (
                        <div key={index} className={'h-[450px] w-[300px] rounded-xl overflow-hidden relative border-[1px] border-[#9994]'}>
                            <Link href={{ pathname: "/anime", query: {id: anime.animeJikanId} }}>
                                <img
                                    src={anime.animeThumbnailUrl}
                                    alt={anime.animeTitleEnglish || anime.animeTitle}
                                    className={'w-full h-full object-cover hover:scale-105 duration-200'}
                                />
                                <div className={'w-full h-full -translate-y-full flex flex-col opacity-0 hover:opacity-100 duration-300'}>
                                    <div className={'bg-bgcolor/80 w-full h-fit mt-auto'}>
                                        <h3 className={"text-xl font-bold text-white text-center"}>
                                            {anime.animeTitleEnglish|| anime.animeTitle}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </>
    );
}