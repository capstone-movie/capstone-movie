'use client';

import {useEffect, useState, useRef} from "react";
import {ListItem} from "@/app/(index)/list-item";
import {ListHeader} from "@/app/(index)/list-header";
import {fetchHorizontalList} from "@/app/(index)/horizontal-list.action";

type Props = {
    url: string
    title: string
}

export function HorizontalList(prop: Props) {
    const [data, setData] = useState<any>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchHorizontalList(prop.url)
            setData(result)
        };
        fetchData().then(() => {});
    }, [prop.url]);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            const scrollAmount = window.innerWidth / 2;
            scrollContainerRef.current.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            const scrollAmount = window.innerWidth / 2;
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <div className={'h-fit relative'}>
                <ListHeader text={prop.title}/>
                <div className={'relative overflow-hidden'}>
                    {/* Left scroll button - overlaid on content */}
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-r-md p-3 shadow-lg transition-all"
                        aria-label="Scroll left"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Scrollable container */}
                    <div
                        ref={scrollContainerRef}
                        className={'h-fit flex overflow-x-scroll no-scrollbar overflow-y-hidden pr-20'}
                    >
                        {
                            data &&
                            data.map((anime: any, index: number) => (
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
                                no-scrollbar
                                px-1
                                h-[25rem]
                                shrink-0
                                `} key={index}>
                                    <ListItem title={anime.animeTitleEnglish ? anime.animeTitleEnglish : anime.animeTitle}
                                              url={anime.animeThumbnailUrl}
                                              mal_id={anime.animeJikanId}/>
                                </div>
                            ))
                        }
                    </div>

                    {/* Right scroll button - overlaid on content */}
                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-l-md p-3 shadow-lg transition-all"
                        aria-label="Scroll right"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}