'use client'

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {EmbeddedVideo} from "@/app/(index)/embedded-video";
import {fetchAnimeByAnimeId} from "@/utils/models/anime/anime.action";

export default function () {

    const searchParams = useSearchParams();
    const mal_id: string = searchParams.has('id') ? searchParams.get('id') as string : '1';

    const [data, setData] = useState<any>();
    /*    const [dataChar, setDataChar] = useState<ResponseCharacter | null>(null);*/

    const [showVideoURL, setShowVideoURL] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchAnimeByAnimeId(mal_id)
            setData(result)
        }
    }, []);

/*    useEffect(() => {
        const fetchData = async () => {
            const url = `https://api.jikan.moe/v4/anime/${mal_id}/characters`;
            while (true) {
                const response = await fetch(url);
                if (response.ok) {
                    setDataChar(await response.json());
                    break;
                }
            }
        };
        fetchData().then(() => {
        });
    }, []);*/

    if (!data) {
        return <p>Loading...</p>;
    }
    return (
        <div className={'h-fit w-fit p-10'}>
            <div className={'w-full h-[310px] flex'}>
                <img
                    className={'h-full'}
                    src={data.animeThumbnailUrl}
                    alt={data.animeTitleEnglish}
                />
                <div className={'flex flex-col w-full min-w-96 px-10'}>
                    <p className={'text-white font-bold text-3xl'}>{
                        <p className={'text-white font-bold text-3xl'}>{data.animeTitleEnglish ? data.animeTitleEnglish : data.animeTitle}</p>
                    }</p>
                    <div className={'flex gap-4 py-2'}>
                        <p className={'text-white text-xl font-semibold'}>{`Score: ${data.animeScore}`}</p>
                        <p className={'text-white text-xl font-semibold'}>{`Rank #${data.animeRank}`}</p>
                        <button className={'bg-white text-black px-2 rounded-md'}>Add To List</button>
                    </div>
                    <p className={'text-white overflow-y-auto'}>{data.animeDescription.replaceAll('[Written by MAL Rewrite]', '')}</p>
                </div>
                <div className={'bg-green-300 h-[310] aspect-video'}>
                    <img onClick={() => {
                        setShowVideoURL(data.animeTrailerUrl)
                    }}
                         src={data.animeYoutubeThumbnailUrl}
                         className={'w-full h-full object-cover'}
                    />
                    <div className={'w-full h-full -translate-y-full flex flex-col justify-center align-middle'}>
                        <button onClick={() => {
                            setShowVideoURL(data.animeTrailerUrl)
                        }}
                                className={'bg-black/80 w-[30%] h-[20%] mx-auto flex justify-center items-center border-2 rounded-xl'}>
                            <p className={"text-white text-2xl"}>
                                Play
                            </p>
                        </button>
                    </div>
                </div>
            </div>
            <div className={' w-full h-fit flex text-white'}>
                <div className={'w-[220] h-full shrink-0 py-5'}>
                    {/*                    <p>Alternative Titles</p>
                    {
                        data.data.title_synonyms.map((title, index) => (
                            <p key={title}>{title}</p>
                        ))
                    }*/}
                    {/*                    <p>{data.data.title_japanese}</p>
                    <p>Information</p>
                    <p>{`Type: ${data.data.type}`}</p>
                    <p>{`Episodes: ${data.data.episodes}`}</p>
                    <p>{`Status: ${data.data.status}`}</p>
                    <p>{`Aired: ${data.data.aired.prop.string}`}</p>
                    <p>{`Premiered: ${data.data.season} ${data.data.year}`}</p>
                    <p>{`Producers: ${data.data.producers.map(producer => producer.name).join(', ')}`}</p>
                    <p>{`Licensors: ${data.data.licensors.map(licensor => licensor.name).join(', ')}`}</p>
                    <p>{`Studios: ${data.data.studios.map(studio => studio.name).join(', ')}`}</p>
                    <p>{`Genres: ${data.data.genres.map(genre => genre.name).join(', ')}`}</p>
                    <p>{`Themes: ${data.data.themes.map(theme => theme.name).join(', ')}`}</p>
                    <p>{`Demographics: ${data.data.demographics.map(demo => demo.name).join(', ')}`}</p>
                    <p>Statistics</p>
                    <p>{`Score: ${data.data.score}`}</p>
                    <p>{`Rank: #${data.data.rank}`}</p>
                    <p>{`Popularity: #${data.data.popularity}`}</p>*/}
                </div>
                {/*                <div className={'flex-grow pt-5  pl-10 '}>
                    <p className={'text-white text-4xl pb-4 w-fit font-bold'}>
                        Characters
                    </p>
                    <div className={'overflow-y-auto overflow-x-auto flex flex-wrap gap-4'}>
                        {
                            dataChar.data.map((character) => (
                                !character.character.images.jpg.image_url.includes('questionmark') &&
                                <div key={character.character.mal_id} className={'w-[220px] rounded-xl'}>
                                    <div className={'bg-red-500 w-full h-[35vh] rounded-xl overflow-hidden'}>
                                        <img
                                            className={'object-cover w-full h-full scale-105 hover:scale-110 duration-300'}
                                            src={character.character.images.jpg.image_url}
                                            alt={character.character.name}
                                        />
                                    </div>
                                    <p className={'px-2 text-white text-nowrap font-bold'}>{`${character.character.name}`}</p>
                                </div>

                            ))
                        }
                    </div>
                </div>*/}
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