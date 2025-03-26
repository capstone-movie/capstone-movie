'use client';

import {useEffect, useState} from "react";
import {ListItem} from "@/app/(index)/list-item";
import {ListHeader} from "@/app/(index)/list-header";
import {fetchHorizontalList} from "@/app/(index)/horizontal-list.action";

type Props = {
    url: string
    title: string
}

export function HorizontalList(prop: Props) {

    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            setData(await fetchHorizontalList(prop.url))
        };
        fetchData().then(() => {
        });
    }, []);

    return (
        <>
            <div className={'h-fit'}>
                <ListHeader text={prop.title}/>
                <div className={'h-fit flex overflow-x-scroll no-scrollbar overflow-y-hidden pr-20'}>
                    {
                        data &&
                        data.data.map((anime: any, index: number) => (
                            <div className={`
                            w-[100%]
                            500:w-[50%]
                            800:w-[33.33%]
                            1100:w-[25%]
                            1400:w-[20%]
                            1700:w-[16.66%]
                            2000:w-[14.28%]
                            2300:w-[12.5%] 
                            2600:w-[11.11%]
                            px-1
                            h-[25rem]
                            shrink-0
                            `} key={index}>
                                <ListItem title={anime.title_english ? anime.title_english : anime.title}
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