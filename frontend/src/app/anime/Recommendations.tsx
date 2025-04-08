import {useEffect, useState} from "react";
        import {fetchAnimeRecommendations} from "@/app/anime/anime-page.action";

        /**
         * Recommendations component to display a horizontal list of recommended anime.
         * Fetches anime recommendations based on the provided genre URLs and displays
         * the top 10 results in a scrollable view.
         *
         * @param {Object} props - The component props.
         * @param {string[]} props.urls - An array of genre URLs to fetch recommendations from.
         * @returns {JSX.Element} A scrollable list of recommended anime.
         */
        export default function Recommendations({urls}: { urls: string[] }) {

            // State to store fetched recommendation data
            let [data, setData] = useState<any>(null);

            useEffect(() => {
                /**
                 * Fetches anime recommendations from the API based on the first genre URL.
                 * Updates the state with the fetched data.
                 */
                const fetchData = async () => {
                    const result = await fetchAnimeRecommendations('genres/' + urls[0]);
                    setData(result);
                };
                fetchData().then(() => {});
            }, []);

            // Return an empty fragment if no data is available
            if (!data)
                return <></>;

            // Limit the data to the top 10 recommendations
            data = data.splice(0, 10);

            return (
                <div className={'h-fit flex overflow-x-scroll no-scrollbar overflow-y-hidden'}>
                    {
                        data &&
                        data.map((anime: any, index: number) => (
                            <div className={`
                                    p-1
                                    h-[15rem]
                                    aspect-[2/3]
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
                                        className={'w-full h-full object-cover hover:scale-105 duration-200'}
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
            );
        }