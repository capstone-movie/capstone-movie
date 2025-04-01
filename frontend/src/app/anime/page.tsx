'use client'

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {EmbeddedVideo} from "@/app/(index)/embedded-video";
import {fetchAnimePage} from "@/app/anime/anime-page.action";
import {Calendar, CircleX, Clock, Star} from "lucide-react";
import Recommendations from "@/app/anime/Recommendations";
import Link from "next/link";

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
            <div className={'h-full w-full sm:w-[500px] flex flex-col sm:sticky top-28'}>
                <img
                    className={'w-full object-contain rounded-xl mb-4'}
                    src={data.animeThumbnailUrl}
                    alt={data.animeTitleEnglish}
                />
                {
                    data.animeScore &&
                    <div className={'w-full h-10 flex gap-2'}>
                        <Star color={'#ffc700'}/>
                        <p className={'text-white font-bold'} aria-label={`Anime score: ${data.animeScore.toFixed(2)}`}>
                            {data.animeScore.toFixed(2)}
                        </p>
                    </div>
                }
                {
                    data.animeAiredStart &&
                    <div className={'w-full h-10 flex gap-2'}>
                        <Calendar color={'#734cff'}/>
                        <p className={'text-white font-bold'}>
                            {convertDateRange(data)}
                        </p>
                    </div>
                }
                {
                    data.animeEpisodes &&
                    <div className={'w-full h-10 flex gap-2'}>
                        <Clock color={'#734cff'}/>
                        <p className={'text-white font-bold'}>
                            {formatEpisodeAndDuration(data)}
                        </p>
                    </div>
                }
                {
                    data.genres &&
                    <div className={'w-full mb-6 border-y-1 py-2 border-white/20 flex gap-2 flex-col'}>
                        <p className={'text-white font-bold'}>
                            {'Genres'}
                        </p>
                        <div className={'mr-4'}>
                            {data.genres.map((genre: any, index: number) => (
                                <button key={index} className={'px-3 mr-2 mb-2 py-1 bg-[#4449] rounded-full'}>
                                    <p className={'text-white text-sm font-bold'}>
                                        {genre.genresName}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                }
            </div>
            <div className={'h-full w-full text-white pl-8'}>
                <div className={'flex flex-col'}>
                    <div className={'flex justify-between mb-8'}>
                        <h1 className={'font-bold text-3xl'}>
                            {data.animeTitleEnglish ? data.animeTitleEnglish : data.animeTitleJapanese}
                        </h1>
                        <AddToListButton animeJikanId={data.animeJikanId}/>
                    </div>
                    <div className={'p-4 border rounded-md border-white/20'}>
                        <h2 className={'font-bold text-xl mb-3'}>
                            Summary
                        </h2>
                        <p className={'text-white whitespace-pre-wrap'}>
                            {data.animeDescription}
                        </p>
                    </div>
                </div>

                {
                    data.animeTrailerUrl &&
                    <div className={'flex flex-col my-8'}>
                        <div className={'p-4 border rounded-md border-white/20'}>
                            <h2 className={'font-bold text-xl mb-3'}>
                                Trailer
                            </h2>
                            <div className={'w-full aspect-video overflow-hidden justify-between items-center'}>
                                <iframe src={data.animeTrailerUrl}
                                        className={'w-full h-full rounded-xl'}
                                        allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                }
                {
                    data.genres &&
                    <div className={'flex flex-col my-8'}>
                        <div className={'p-4 border rounded-md border-white/20'}>
                            <h2 className={'font-bold text-xl mb-3'}>
                                Recommendations
                            </h2>
                            <Recommendations urls={makeArrayOfGenres(data)}/>
                        </div>
                    </div>
                }
                <div className={'p-4 border rounded-md border-white/20'}>
                    <div className={'flex justify-between'}>
                        <h2 className={'font-bold text-xl mb-3'}>
                            Reviews
                        </h2>
                        <WriteReviewButton animeJikanId={data.animeJikanId}/>
                    </div>
                    <p>
                        None, yet. Be the first to write a review!
                    </p>
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

function makeArrayOfGenres(data: any): any[] {
    const names: any[] = []
    data.genres.map((genre: any, index: number) => (
        names.push(genre.genresName)
    ))
    return names
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

function WriteReviewButton(animeJikanId: any) {

    console.log(animeJikanId)

    return (
        <Link href={{pathname: "/review-page", query: {id: animeJikanId}}}>
            <p className="text-sm w-fit font-bold bg-transparent border-2 border-white/40 text-white rounded-xl px-6 py-3 transition-all duration-200 ease-in-out transform hover:bg-white/20 hover:scale-105 active:bg-white/40 text-nowrap">
                {'Write Review'}
            </p>
        </Link>
    )
}

function AddToListButton(animeJikanId: any) {

    const [submenu, setSubmenu] = useState(false);

    return (
        <div className={'flex flex-col items-end'}>
            <button

                onMouseLeave={()=>{setSubmenu(prev => false)}}

                onClick={() => {
                setSubmenu(prev => !prev)
            }} className="w-fit">
                <p className="text-sm w-fit font-bold bg-transparent border-2 border-white/40 text-white rounded-xl px-6 py-3 transition-all duration-200 ease-in-out transform hover:bg-white/20 hover:scale-105 active:bg-white/40 text-nowrap">
                    {'Add To List'}
                </p>
            </button>
            {
                submenu &&
                <div className={'bg-fhcolor w-[200px] overflow-hidden flex flex-col rounded-xl absolute translate-y-[45px]'}>
                    <button className={'flex gap-2 hover:bg-white/20 px-2 pt-2 pb-1'}
                            onMouseLeave={() => setSubmenu(prev => false)}
                            onMouseEnter={() => setSubmenu(prev => true)}
                            onClick={()=>{setSubmenu(false)}}>
                        <Star color={'#ffc900'}/>
                        <p>
                            Favorite
                        </p>
                    </button>
                    <button className={'flex gap-2 hover:bg-white/20 px-2 py-1'}
                            onMouseLeave={() => setSubmenu(prev => false)}
                            onMouseEnter={() => setSubmenu(prev => true)}
                            onClick={()=>{setSubmenu(false)}}>
                        <Clock color={'#ffc900'}/>
                        <p>
                            Watch Later
                        </p>
                    </button>
                    <button className={'flex gap-2 hover:bg-white/20 px-2 pb-2 pt-1'}
                            onMouseLeave={() => setSubmenu(prev => false)}
                            onMouseEnter={() => setSubmenu(prev => true)}
                            onClick={()=>{setSubmenu(false)}}>
                        <CircleX color={'#ffc900'}/>
                        <p>
                            Hide Anime
                        </p>
                    </button>
                </div>
            }
        </div>
    )
}