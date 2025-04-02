import {useEffect, useState} from "react";
import {fetchAnimeRecommendations} from "@/app/anime/anime-page.action";

export default function Recommendations({urls}: { urls: string[] }) {

    let [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchAnimeRecommendations('genres/' + urls[0])
            setData(result)
        };
        fetchData().then(() => {
        });
    }, []);

    if (!data)
        return <></>

    data = data.splice(0, 10)

    return (
        <div className={'h-fit grid grid-cols-5'}>
            {
                data &&
                data.map((anime: any, index: number) => (
                    <div className={`
                            p-1
                            h-[25rem]
                            `} key={index}>
                        <div
                            className={'w-full h-full rounded-xl overflow-hidden group-hover:scale-50 relative border-[1px] border-[#9994]'}
                            onClick={() => {
                                const {animeJikanId} = anime;
                                window.history.pushState(null, "", `/anime?id=${animeJikanId}`);
                                window.location.reload();
                            }}>
                            <img
                                src={anime.animeThumbnailUrl}
                                alt={anime.animeTitleEnglish}
                                className={'w-full h-full object-cover bg-white hover:scale-105 duration-200'}
                            />
                            <div
                                className={'w-full h-full -translate-y-full flex flex-col opacity-0 hover:opacity-100 duration-300'}>
                                <div className={'bg-bgcolor/80 w-full h-fit mt-auto'}>
                                    <h3 className={"text-xl font-bold text-white text-center"}>
                                        {anime.animeTitleEnglish}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}