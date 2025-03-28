import {useEffect, useState} from "react";
import {ListItem} from "@/app/(index)/list-item";
import {ListHeader} from "@/app/(index)/list-header";

type Response = {
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

type Props = {
    url: string
    title: string
}

export function HorizontalListRecommended(prop: Props) {

    const [data, setData] = useState<Response | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const url = prop.url;
            while (true) {
                const response = await fetch(url);
                if (response.ok) {
                    const newData: Response = await response.json();
                    newData.data = newData.data.filter((v, i, a) => a.findIndex(t => (t.entry[0].title === v.entry[0].title)) === i)
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
                <div className={'bg-bgcolor h-fit flex overflow-x-scroll gap-4 no-scrollbar overflow-y-hidden'}>
                    {
                        data &&
                        data.data.map((anime, index) => (
                            <div className={'h-[30vh] aspect-[2/3]'}
                                 key={index}>
                                <ListItem
                                    url={anime.entry[0].images.webp.large_image_url}
                                    title={anime.entry[0].title}
                                    mal_id={anime.entry[0].mal_id}/>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}