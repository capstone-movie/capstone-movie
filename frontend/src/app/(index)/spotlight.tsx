import { useEffect, useState } from "react";
import { EmbeddedVideo } from "@/app/(index)/embedded-video";
import Link from "next/link";
import { fetchHorizontalList } from "@/app/(index)/horizontal-list.action";

type Props = {
    url: string;
};

export function Spotlight(prop: Props) {
    const [data, setData] = useState<any>(null);
    const [isExpanded, setIsExpanded] = useState(false); // Track if the description is expanded
    const [currentIndex, setCurrentIndex] = useState(1); // Initial focus on index 5
    const [showVideoURL, setShowVideoURL] = useState('')

    const toggleDescription = () => {
        setIsExpanded((prevState) => !prevState); // Toggle expanded state
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchHorizontalList(prop.url);
            const filteredResult = result.filter((item: any) => item.animeYoutubeThumbnailUrl !== null);
            setData(filteredResult);
        };
        fetchData();
    }, [prop.url]);


    const checkThumbnailUrl = async (url: string) => {
        try {
            const response = await fetch(url, { method: "HEAD" });
            // If status is 404, return false
            return response.status !== 404;
        } catch (error) {
            // Handle any network errors or issues (e.g., URL is invalid or unreachable)
            return false;
        }
    };

    useEffect(() => {
        if (data) {
            const intervalId = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length); // Rotate through the data array
            }, 5000);

            return () => clearInterval(intervalId); // Cleanup interval on unmount or when data changes
        }
    }, [data]);

    const focus = data ? data[currentIndex] : undefined;

    if (!focus) {
        return <></>;
    }

    const truncatedDescription = focus.animeDescription?.length > 300
        ? `${focus.animeDescription?.substring(0, 300)}...`
        : focus.animeDescription;

    // Check if the description exceeds 300 characters to show "read more" link
    const showReadMore = focus.animeDescription?.length > 300;

    return (
        <>
            <div className={"h-[70vh] relative w-full mx-auto"}>
                <div className={"h-full relative w-fit ml-auto"}>
                    <img
                        src={focus.animeYoutubeThumbnailUrl ?? ""}
                        className={"h-full object-cover"}
                        alt={"Spotlight thumbnail"}
                    />
                    <div className={"from-bgcolor to-50% to-transparent bg-gradient-to-t h-full w-full absolute top-0 left-0"}></div>
                    <div className={"from-bgcolor to-50% to-transparent bg-gradient-to-r h-full w-full absolute top-0 left-0"}></div>
                </div>
                <div className={"w-full h-full absolute top-0 left-0 p-5"}>
                    <h3 className={"text-4xl font-bold text-white text-left mb-5"}>
                        {focus.animeTitleEnglish || focus.animeTitle}
                    </h3>
                    <p className={"text-white text-left mb-5 max-w-[700px] w-full drop-shadow-xl"}>
                        {isExpanded ? focus.animeDescription : truncatedDescription}
                        {showReadMore && (
                            <span onClick={toggleDescription} className={'underline text-gray-200'}>
                                {isExpanded ? "read less" : "read more"}
                            </span>
                        )}
                    </p>
                    <div className={'flex flex-col w-fit gap-5'}>
                        <div>
                            {focus.animeYoutubeThumbnailUrl && (
                                <button
                                    onClick={() => {
                                        setShowVideoURL(focus.animeTrailerUrl);
                                    }}
                                    className={"bg-bgcolor/80 text-white w-[110px] h-[50px] border-2 rounded-xl cursor-pointer mr-5"}
                                >
                                    View Trailer
                                </button>
                            )}
                            <Link href={{ pathname: "/anime", query: { id: focus.animeJikanId } }}>
                                <button className={"bg-bgcolor/80 text-white w-[110px] h-[50px] border-2 rounded-xl cursor-pointer"}>
                                    More
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {showVideoURL !== "" && <EmbeddedVideo url={showVideoURL} title={"test"} exit={setShowVideoURL} />}
        </>
    );
}
