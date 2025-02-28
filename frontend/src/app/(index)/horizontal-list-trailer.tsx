import {useEffect, useState} from "react";
import {EmbeddedVideo} from "@/app/(index)/embedded-video";
import {ListHeader} from "@/app/(index)/list-header";
import Link from "next/link";

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

export function HorizontalListTrailer(prop: Props) {

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
        fetchData().then(() => {
        });
    }, []);

    const [showVideoURL, setShowVideoURL] = useState('')

    return (
        <>
            <div className={'bg-bgcolor h-fit'}>
                <ListHeader text={prop.title}/>
                <div className={'bg-bgcolor h-fit flex overflow-x-scroll gap-4 no-scrollbar overflow-y-hidden'}>
                    {
                        data &&
                        data.data.map((anime, index) => (
                            anime.trailer.embed_url &&
                            <div className={'bg-green-200 h-[30vh] aspect-video'}
                                 key={index}>
                                <img src={`https://img.youtube.com/vi/${anime.trailer.url?.slice(-11)}/0.jpg`}
                                    className={'w-full h-full object-cover'}
                                />
                                <div className={' w-full h-full -translate-y-full flex flex-col justify-center opacity-0 hover:opacity-100 duration-500'}>

                                    <Link href={{ pathname: "/anime", query: { id: anime.mal_id } }}>
                                        <button className={'bg-bgcolor rounded-full size-10 absolute right-2 top-2 border-white border-2'}>
                                            <p className={'text-white text-2xl font-bold'}>
                                                ?
                                            </p>
                                        </button>
                                    </Link>
                                    <button onClick={() => {
                                        setShowVideoURL(anime.trailer.embed_url)
                                    }}
                                            className={'bg-bgcolor/80 w-[30%] h-[20%] mx-auto flex justify-center items-center border-2 rounded-xl'}>
                                        <p className={"text-white text-2xl"}>
                                            Play
                                        </p>
                                    </button>
                                    <div className={'bg-bgcolor/80 w-full h-fit bottom-0 absolute flex flex-col justify-center'}>
                                        <h3 className={"text-2xl font-bold text-white text-center"}>
                                            {anime.title_english}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                showVideoURL !== '' &&
                <EmbeddedVideo url={showVideoURL}
                               title={'test'}
                               exit={setShowVideoURL}/>
            }
        </>
    )
}