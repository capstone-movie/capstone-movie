"use client";
import React, {useEffect, useState} from "react";
import {
    addWatchList,
    deleteWatchListServerAction,
    getWatchListServerAction
} from "@/app/personal-dashboard/watch-list.actions";
import {useSessionContext} from "@/app/(index)/ContextWrapper";
import {motion} from "framer-motion";
import {fetchAnimePage} from "@/app/anime/anime-page.action";
import {Cross, X} from "lucide-react";
import { addToListSchema } from "@/app/anime/addToList.validator";
import { z } from "zod";

const deleteWatchListSchema = z.object({
    animeId: z.string().uuid("Invalid anime ID"),
    apiEndpoint: z.enum(["favorite", "later", "hidden"]),
});

export default function Dashboard() {
    const [animeDataBySection, setAnimeDataBySection] = useState<Record<string, any[]>>({
        favorite: [],
        later: [],
        recommendations: [],
        hidden: [],
    });
    const {session} = useSessionContext();

    useEffect(() => {

        const fetchAllSections = async () => {

            const favorite = await getWatchListServerAction("favorite");
            const watchLater = await getWatchListServerAction("later");
            const hidden = await getWatchListServerAction("hidden");

            setAnimeDataBySection({
                favorite,
                watchLater,
                hidden,
            });
        };
        fetchAllSections();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-20 px-5">
            {
                session &&
                <main className="text-white flex flex-col gap-2">
                    <motion.h2
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        className="text-white text-5xl font-bold tracking-tight text-center mt-12 mb-10"
                    >
                        {'Dashboard'}
                    </motion.h2>
                    <DashboardList urlPath={'favorite'}/>
                    <DashboardList urlPath={'later'}/>
                    <DashboardList urlPath={'hidden'}/>
                </main>
            }
        </div>
    );
};
function DashboardList({urlPath}: { urlPath: string }) {
    const [data, setData] = useState<any>(null);
    const [more, setMore] = useState(false);

    const fetchData = async () => {
        const result = await getWatchListServerAction(urlPath);
        console.log("fetch data", result);
        setData(result);
    };

    useEffect(() => {
        fetchData();
    }, [urlPath]);

    const onButtonClickedDelete = async (animeId: string) => {
        const validation = deleteWatchListSchema.safeParse({ animeId, apiEndpoint: urlPath });
        if (!validation.success) {
            console.error("❌ Delete validation error:", validation.error.format());
            alert("Invalid delete request.");
            return;
        }
        try {
            await deleteWatchListServerAction(validation.data.apiEndpoint, validation.data.animeId);
            console.log("🗑️ Successfully deleted:", validation.data);
            fetchData();
        } catch (err) {
            console.error("❌ Delete failed:", err);
            alert("Failed to delete anime from list.");
        }
    };

    if (!data) return <></>;

    return (
        <div>
            <div className="bg-fhcolor flex h-fit flex-col rounded-3xl shadow-lg px-4 pb-2">

                <div className={'flex justify-between px-2 py-2'}>
                    <h2 className="text-2xl font-bold capitalize">{urlPath}</h2>
                    <button
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-semibold hover:scale-105"
                        onClick={() => setMore(!more)}
                    >
                        {more ? 'Collapse' : 'View All'}
                    </button>
                </div>

                <div className={`flex  ${more ? 'flex-wrap justify-center' : ''} gap-3 bg-bgcolor overflow-x-auto rounded-2xl shadow-lg p-2`}>
                {
                        data.data.map((anime: any, index: any) => (
                            <div key={index} className={`
                            h-fit 
                            flex 
                            flex-col
                            p-1
                            bg-fhcolor
                            rounded-xl
                            `}>
                                <div className={'flex gap-2 px-1 py-0.5 pb-1 justify-between'}>
                                    <MyField index={index} animeId={anime.watchListAnimeId} apiEndpoint={urlPath}
                                             passFetchData={fetchData}/>
                                    <X color={'#ff8a8a'}
                                       className={'hover:bg-white/20 rounded-md duration-200'}
                                       onClick={() => onButtonClickedDelete(anime.watchListAnimeId)}>
                                    </X>
                                </div>
                                <div className={`
                            w-[220px]
                            h-[300px]
                            `} key={index}>
                                    <div
                                        className={'w-full h-full rounded-xl overflow-hidden group-hover:scale-50 relative border-[1px] border-[#9994]'}
                                        onClick={() => {
                                            window.history.pushState(null, "", `/anime?id=${anime.animeJikanId}`);
                                            window.location.reload();
                                        }}>
                                        <img
                                            src={anime.animeThumbnailUrl}
                                            alt={anime.animeTitleEnglish}
                                            className={'w-full h-full object-cover hover:scale-105 duration-200'}
                                        />
                                        <div
                                            className={'w-full h-full -translate-y-full flex flex-col opacity-0 hover:opacity-100 duration-300'}>
                                            <div className={'bg-bgcolor/80 w-full h-fit mt-auto'}>
                                                <h3 className={"text-xl font-bold text-white text-center"}>
                                                    {anime.animeTitleEnglish ? anime.animeTitleEnglish : anime.animeTitle}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

// Define the props type to include animeId, animeRank, and apiEndpoint
interface MyFieldProps {
    index: number,
    animeId: string,
    apiEndpoint: string,
    passFetchData: () => Promise<void>
}

const MyField = ({index, animeId, apiEndpoint, passFetchData}: MyFieldProps) => {
    // Initialize the state to allow editing, starting with the initial value
    const defaultValue = `#${index + 1}`;
    const [inputValue, setInputValue] = useState(defaultValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);  // Update the state with the new value
    };

    const shoveToBackend = (newValue: number) => {
        const payload = { animeId, animeRank: Math.max(newValue - 1, 0), apiEndpoint };
        const validation = addToListSchema.safeParse(payload);
        if (!validation.success) {
            console.error("Rank update validation failed:", validation.error.format());
            alert("Invalid input.");
            return;
        }
        const fetchData = async () => {
            await addWatchList(validation.data);
            console.log("Rank updated:", validation.data);
            await passFetchData();
            setInputValue(`#${index + 1}`);
        };
        fetchData();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const value = parseInt(inputValue.replace("#", ""));
            if (!isNaN(value)) shoveToBackend(value);
            else setInputValue(defaultValue);
            e.currentTarget.blur();
        }
    };

    const handleFinished = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value.replace("#", ""));
        if (!isNaN(value)) shoveToBackend(value);
        else setInputValue(defaultValue);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select(); // Select all text when input is focused (clicked)
    };

    return (
        <input
            type="text"
            value={inputValue}
            onChange={handleChange}  // Update the state when user edits the input
            onBlur={handleFinished}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}    // Select all text when clicked/focused
            className={'text-white font-bold w-[50px] bg-transparent border-b border-white text-center'}
        />
    );
};
