import {useEffect, useState} from "react";
import {ListItem} from "@/app/(index)/list-item";
import {ListHeader} from "@/app/(index)/list-header";

type AnimeResponse = {
    data: {
        mal_id: string;
        entry: {
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
            title: string;
        }[];
        content: string;
        user: {
            url: string;
            username: string;
        };
    }[];
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
    };
};

type HorizontalListProps = {
    url: string
    title: string
}

export function HorizontalListRecommended(prop: HorizontalListProps) {

    const [animeResponse, setAnimeResponse] = useState<AnimeResponse>()

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
                                <ListItem
                                    url={anime.entry[0].images.webp.large_image_url}
                                    title={anime.entry[0].title}/>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}