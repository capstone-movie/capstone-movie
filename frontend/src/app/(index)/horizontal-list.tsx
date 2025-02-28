import {useEffect, useState} from "react";
import {ListItem} from "@/app/(index)/list-item";
import {ListHeader} from "@/app/(index)/list-header";

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

export function HorizontalList(prop: Props) {

    const [data, setData] = useState<Response | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const url = prop.url;
            while (true) {
                const response = await fetch(url);
                if (response.ok) {
                    const newData: Response = await response.json();
                    newData.data = newData.data.filter((v, i, a) => a.findIndex(t => (t.title === v.title)) === i)
                    setData(newData);
                    break;
                }
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        };
        fetchData().then(() => {});
    }, []);

    return (
        <>
            <div className={'bg-bgcolor h-fit'}>
                <ListHeader text={prop.title}/>
                <div className={'bg-bgcolor h-fit flex overflow-x-scroll no-scrollbar gap-4 overflow-y-hidden'}>
                    {
                        data &&
                        data.data.map((anime, index) => (
                            <div className={'h-[30vh] aspect-[2/3]'}
                                 key={index}>
                                <ListItem title={anime.title_english}
                                          url={anime.images.webp.large_image_url}
                                          mal_id={anime.mal_id}/>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}