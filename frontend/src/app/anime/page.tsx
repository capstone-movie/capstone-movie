'use client'

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {EmbeddedVideo} from "@/app/(index)/embedded-video";
import {fetchAnimePage} from "@/app/anime/anime-page.action";
import {Calendar, Clock, Star} from "lucide-react";

export default function () {

    const searchParams = useSearchParams();
    const mal_id: string = searchParams.has('id') ? searchParams.get('id') as string : '1';

    const [showVideoURL, setShowVideoURL] = useState('')

    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchAnimePage(mal_id)
            setData(result)
        };
        fetchData().then(() => {
        });
    }, []);
    if (!data) {
        return <></>;
    }
    return (
        <div className={'h-fit w-full flex flex-col sm:flex-row p-10 relative'}>
            <div className={'h-fit w-full sm:w-[500px] flex flex-col'}>
                <img
                    className={'w-full object-contain rounded-xl mb-4'}
                    src={data.animeThumbnailUrl}
                    alt={data.animeTitleEnglish}
                />
                <div className={'w-full h-10 flex gap-2'}>
                    <Star color={'#ffc700'}/>
                    <p className={'text-white font-bold'}>
                        {data.animeScore.toFixed(2)}
                    </p>
                </div>
                <div className={'w-full h-10 flex gap-2'}>
                    <Calendar color={'#734cff'}/>
                    <p className={'text-white font-bold'}>
                        {convertDateRange(data)}
                    </p>
                </div>
                <div className={'w-full h-10 flex gap-2'}>
                    <Clock color={'#734cff'}/>
                    <p className={'text-white font-bold'}>
                        {formatEpisodeAndDuration(data)}
                    </p>
                </div>
                <div className={'w-full h-10 flex gap-2 flex-col'}>
                    <p className={'text-white font-bold'}>
                        {'Genres'}
                    </p>
                    <div className={'mr-4'}>
                        {data.genres.map((genre: string, index: number) => (
                            <button key={index} className={'px-3 mr-2 mb-2 py-1 bg-[#4449] rounded-full'}>
                                <p className={'text-white text-sm font-bold'}>
                                    {genre.genresName}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className={'h-full w-full text-white pl-8'}>
                <div className={'flex flex-col'}>
                    <h1 className={'font-bold text-3xl mb-8'}>
                        {data.animeTitleEnglish ? data.animeTitleEnglish : data.animeTitleJapanese}
                    </h1>
                    <div className={'p-4 border rounded-md border-white/20'}>
                        <h2 className={'font-bold text-xl mb-3'}>
                            Summary
                        </h2>
                        <p className={'text-white whitespace-pre-wrap'}>
                            {data.animeDescription}
                        </p>
                    </div>
                </div>
                <div className={'flex flex-col my-8'}>
                    <div className={'p-4 border rounded-md border-white/20'}>
                        <h2 className={'font-bold text-xl mb-3'}>
                            Trailer
                        </h2>
                        <div className={'w-full aspect-video overflow-hidden justify-between items-center px-4'}>
                            <iframe src={data.animeTrailerUrl}
                                    className={'w-full h-full rounded-xl'}
                                    allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
                <div className={'flex flex-col'}>
                    <h1 className={'font-bold text-3xl mb-8'}>
                        {'Recommendations'}
                    </h1>
                    <div className={'p-4 border rounded-md border-white/20'}>
                        <h2 className={'font-bold text-xl mb-3'}>
                            Summary
                        </h2>
                        <p className={'text-white whitespace-pre-wrap'}>
                            {data.animeDescription}
                        </p>
                    </div>
                </div>
            </div>
            {
                showVideoURL !== '' &&
                <EmbeddedVideo url={showVideoURL}
                               title={'test'}
                               exit={setShowVideoURL}/>
            }
        </div>
    );
}

function formatEpisodeAndDuration(data: any) {
    return `${data.animeEpisodes} episodes, ${data.animeDuration}`
}

function convertDateRange(data: any) {
    return `${convertDate(data.animeAiredStart)} to ${convertDate(data.animeAiredEnd)}`
}

function convertDate(str: string) {
    const date = new Date('2024-03-22T00:00:00.000Z');
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    return formattedDate
}
