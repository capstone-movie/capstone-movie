'use client'

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {EmbeddedVideo} from "@/app/(index)/embedded-video";
import {fetchAnimePage, fetchReviewByAnimeId} from "@/app/anime/anime-page.action";
import {Calendar, CircleX, Clock, Star} from "lucide-react";
import Recommendations from "@/app/anime/Recommendations";
import Link from "next/link";
import {addWatchList} from "@/app/personal-dashboard/watch-list.actions";
import {useSessionContext} from "@/app/(index)/ContextWrapper";

import { addToListSchema } from "@/app/anime/addToList.validator";

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
        <div className={'h-fit w-screen flex flex-col sm:flex-row relative p-[15px]'}>
            <div className={'h-full w-full sm:w-[300px] flex-shrink-0 flex flex-col sm:sticky top-28'}>
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
                    <div className={'w-full border-t-1 py-2 border-white/20 flex gap-2 flex-col'}>
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
                {
                    data.animeTrailerUrl &&
                    <div className={'flex flex-col'}>
                        <div className={'p-4 border rounded-md border-white/20'}>
                            <div className={'w-full aspect-video overflow-hidden justify-between items-center'}>
                                <iframe src={data.animeTrailerUrl}
                                        className={'w-full h-full rounded-xl'}
                                        allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className={'h-full w-full sm:[width:calc(100vw-300px-20px)] mt-4 pl-[10px] text-white'}>
                <div className={'flex flex-col'}>
                    <div className={'flex justify-between mb-4 items-center'}>
                        <h1 className={'font-bold text-3xl'}>
                            {data.animeTitleEnglish ? data.animeTitleEnglish : data.animeTitleJapanese}
                        </h1>
                        <AddToListButton animeId={data.animeId} animeRank={0}/>
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
                    data.genres &&
                    <div className={'flex w-full  flex-col my-8'}>
                        <div className={'p-4 border relative rounded-md border-white/20'}>
                            <h2 className={'font-bold text-xl mb-3 overflow-x-hidden'}>
                                Recommendations
                            </h2>
                            <Recommendations urls={makeArrayOfGenres(data)}/>
                        </div>
                    </div>
                }
                <div className={'p-4 border rounded-md border-white/20'}>
                    <div className={'flex justify-between'}>
                        <h2 className={'font-bold text-xl mb-3 align-middle'}>
                            Reviews
                        </h2>
                        <WriteReviewButton animeJikanId={data.animeJikanId}/>
                    </div>
                    <GrabThemReviews animeJikanId={data.animeJikanId}/>
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
    const date = new Date(str);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    return formattedDate
}

function WriteReviewButton(prop: any) {
    return (
        <Link href={{pathname: "/review-page", query: {id: prop.animeJikanId}}}>
            <p className="text-sm w-fit font-bold bg-transparent border-2 border-white/40 text-white rounded-xl px-6 py-3 transition-all duration-200 ease-in-out transform hover:bg-white/20 hover:scale-105 active:bg-white/40 text-nowrap">
                {'Write Review'}
            </p>
        </Link>
    )
}

function AddToListButton({ animeId, animeRank }: { animeId: string; animeRank: number }) {
    const [submenu, setSubmenu] = useState(false);
    const { session } = useSessionContext();

    function doSomething(apiEndpoint: string) {
        const fetchData = async () => {
            console.log("🚀 Attempting to add to list:", { animeId, animeRank, apiEndpoint });

            const result = addToListSchema.safeParse({
                animeId,
                animeRank,
                apiEndpoint
            });
            if (!result.success) {
                console.error("Validation failed:", result.error.format());
                alert("Something went wrong. Please try again.");
                return;
            }
            try {
                await addWatchList(result.data);
                console.log("Successfully added to list:", result.data);
            } catch (err) {
                console.error("Failed to call addWatchList:", err);
                alert("Failed to add anime to your list.");
            }
        };
        fetchData();
    }
    return (
        <div className="flex flex-col items-end">
            {session && (
                <button
                    onMouseLeave={() => setSubmenu(false)}
                    onClick={() => setSubmenu(prev => !prev)}
                    className="w-fit"
                >
                    <p className="text-sm w-fit font-bold bg-transparent border-2 border-white/40 text-white rounded-xl px-6 py-3 transition-all duration-200 ease-in-out transform hover:bg-white/20 hover:scale-105 active:bg-white/40 text-nowrap">
                        Add To List
                    </p>
                </button>
            )}

            {submenu && (
                <div className="bg-fhcolor w-[200px] overflow-hidden flex flex-col rounded-xl absolute translate-y-[45px]">
                    <button
                        className="flex gap-2 hover:bg-white/20 px-2 pt-2 pb-1"
                        onMouseLeave={() => setSubmenu(false)}
                        onMouseEnter={() => setSubmenu(true)}
                        onClick={() => {
                            setSubmenu(false);
                            doSomething("favorite");
                        }}
                    >
                        <Star color="#ffc900" />
                        <p>Favorite</p>
                    </button>

                    <button
                        className="flex gap-2 hover:bg-white/20 px-2 py-1"
                        onMouseLeave={() => setSubmenu(false)}
                        onMouseEnter={() => setSubmenu(true)}
                        onClick={() => {
                            setSubmenu(false);
                            doSomething("later");
                        }}
                    >
                        <Clock color="#ffc900" />
                        <p>Watch Later</p>
                    </button>

                    <button
                        className="flex gap-2 hover:bg-white/20 px-2 pb-2 pt-1"
                        onMouseLeave={() => setSubmenu(false)}
                        onMouseEnter={() => setSubmenu(true)}
                        onClick={() => {
                            setSubmenu(false);
                            doSomething("hidden");
                        }}
                    >
                        <CircleX color="#ffc900" />
                        <p>Hide Anime</p>
                    </button>
                </div>
            )}
        </div>
    );
}
export { AddToListButton };

function GrabThemReviews({animeJikanId}: any) {

    if (!animeJikanId) {
        return <></>
    }

    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchReviewByAnimeId(animeJikanId)
            console.log(result)
            setData(result)
        };
        fetchData().then(() => {
        });
    }, []);

    return (
        <>
            <ReviewList data={data} />
        </>
    );
}


function ReviewList({ data }: { data: any }) {
    const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);
    const [revealedSpoilers, setRevealedSpoilers] = useState<number[]>([]);

    const toggleExpand = (index: number) => {
        setExpandedIndexes((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const toggleSpoiler = (index: number) => {
        setRevealedSpoilers((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    return (
        <div className="space-y-10 px-8 py-12 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 min-h-[200px]">
            {!data?.data.length ? (
                <p className="text-center text-zinc-400 text-2xl font-medium italic">
                    No reviews yet. Be the first to share your thoughts.
                </p>
            ) : (
                data.data.map((review: any, index: number) => {
                    console.log(`[${index}] Review:`, JSON.stringify(review, null, 2)); // 🧪 Drop it right here


                    const expanded = expandedIndexes.includes(index);
                    const isSpoiler = review.reviewSpoiler === true;
                    const spoilerRevealed = revealedSpoilers.includes(index);

                    const body = review.reviewBody;
                    const isLong = body.length > 200;
                    const displayBody = expanded || !isLong ? body : body.slice(0, 200) + "...";

                    const bodyClass = isSpoiler && !spoilerRevealed
                        ? "blur-md backdrop-blur-sm text-zinc-300 text-lg leading-relaxed whitespace-pre-wrap mb-2 transition-all duration-300"
                        : "text-zinc-300 text-lg leading-relaxed whitespace-pre-wrap mb-2 transition-all duration-300";

                    return (
                        <div
                            key={index}
                            className="bg-zinc-800 p-8 rounded-2xl border border-zinc-700 shadow-lg transition-transform duration-300 hover:scale-[1.01]"
                        >
                            <div className="flex justify-between items-center mb-4 text-zinc-400 text-lg">
                                <span>{review.profileUsername}</span>
                                <span className="italic">{convertDate(review.reviewCreatedAt)}</span>
                            </div>

                            <div className="text-white text-2xl font-semibold mb-4">
                                {review.reviewAnimeRating} / 10
                            </div>

                            <h2 className="text-white text-3xl font-bold uppercase tracking-wider mb-4">
                                {review.reviewTitle}
                            </h2>

                            <div className={bodyClass}>
                                {displayBody}
                            </div>

                            {isSpoiler && (
                                <button
                                    onClick={() => toggleSpoiler(index)}
                                    className="text-sm text-yellow-500 hover:text-yellow-300 underline mb-2"
                                >
                                    {spoilerRevealed ? "Hide Spoiler" : "Reveal Spoiler"}
                                </button>
                            )}

                            {isLong && (
                                <button
                                    onClick={() => toggleExpand(index)}
                                    className="text-sm text-zinc-400 hover:text-white underline transition"
                                >
                                    {expanded ? "Show Less" : "See More"}
                                </button>
                            )}

                            <div className="mt-6 h-[1px] bg-zinc-600" />
                        </div>
                    );
                })
            )}
        </div>
    );
}
