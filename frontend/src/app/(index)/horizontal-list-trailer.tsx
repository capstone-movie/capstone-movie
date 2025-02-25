import {useEffect, useState} from "react";
import {EmbeddedVideo} from "@/app/(index)/embedded-video";
import {ListHeader} from "@/app/(index)/list-header";

type AnimeResponse = {
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

export function HorizontalListTrailer(prop: HorizontalListProps) {

    const [animeResponse, setAnimeResponse] = useState<AnimeResponse>()

    const initialEffects = () => {
        fetch(prop.url)
            .then(response => response.json())
            .then(json => setAnimeResponse(json))
    }
    useEffect(initialEffects, [setAnimeResponse])

    const [showVideoURL, setShowVideoURL] = useState('')

    if (animeResponse) {
        animeResponse.data = animeResponse.data.filter((v, i, a) => a.findIndex(t => (t.title === v.title)) === i)
    }

    return (
        <>
            <div className={'bg-black h-fit'}>
                <ListHeader text={prop.title}/>
                <div className={'bg-black h-fit flex overflow-x-scroll gap-4 overflow-y-hidden'}>
                    {
                        animeResponse &&
                        animeResponse.data.map((anime, index) => (
                            anime.trailer.embed_url &&
                            <div className={'bg-green-200 h-[30vh] aspect-square'}
                                 key={index}>
                                <img
                                    src={anime.images.webp.large_image_url}
                                    alt={anime.title}
                                    className={'w-full h-full object-cover'}
                                />
                                <div className={' w-full h-full -translate-y-full flex flex-col justify-center opacity-0 hover:opacity-100 duration-500'}>
                                    <button onClick={() => {
                                        setShowVideoURL(anime.trailer.embed_url)
                                    }}
                                            className={'bg-black/80 w-[30%] h-[20%] mx-auto flex justify-center items-center border-2 rounded-xl'}>
                                        <p className={"text-white text-2xl"}>
                                            Play
                                        </p>
                                    </button>
                                    <div className={'bg-black/80 w-full h-fit bottom-0 absolute flex flex-col justify-center'}>
                                        <h3 className={"text-2xl font-bold text-white text-center"}>
                                            {anime.title}
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