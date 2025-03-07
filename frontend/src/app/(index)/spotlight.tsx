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
}

export function Spotlight(prop: Props) {

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

    const focus = data?.data[5];

    if (focus === undefined) {
        return <></>
    }

    return (
        <>
            <div className={'h-[70vh] relative w-full mx-auto'}>
                <div className={'h-full relative w-fit ml-auto'}>
                    <img src={`https://img.youtube.com/vi/${focus.trailer.url?.slice(-11)}/maxresdefault.jpg`}
                         className={'h-full object-cover'}
                         alt={"Spotlight thumbnail"}/>
                    <div className={' from-bgcolor to-50% to-transparent bg-gradient-to-t h-full w-full absolute top-0 left-0'}>
                    </div>
                    <div className={' from-bgcolor to-50% to-transparent bg-gradient-to-r h-full w-full absolute top-0 left-0'}>
                    </div>
                </div>
                <div className={'w-full h-full absolute top-0 left-0 p-5'}>
                    <h3 className={"text-4xl font-bold text-white text-left mb-5"}>
                        {focus.title_english || focus.title}
                    </h3>
                    <p className={"text-white text-left mb-5"}>
                        {focus.synopsis}
                    </p>
                    <button onClick={() => {
                        setShowVideoURL(focus.trailer.embed_url ?? '')
                    }}
                            className={'bg-bgcolor/80 text-white w-[110px] h-[50px] border-2 rounded-xl cursor-pointer mr-5'}>
                        View Trailer
                    </button>
                    <Link href={{pathname: "/anime", query: {id: focus.mal_id}}}>
                        <button className={'bg-bgcolor/80 text-white w-[110px] h-[50px] border-2 rounded-xl cursor-pointer'}>
                            More
                        </button>
                    </Link>
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