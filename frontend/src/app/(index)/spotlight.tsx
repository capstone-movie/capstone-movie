import {useEffect, useState} from "react";
import {EmbeddedVideo} from "@/app/(index)/embedded-video";
import Link from "next/link";
import {fetchHorizontalList} from "@/app/(index)/horizontal-list.action";

type Props = {
    url: string
}

export function Spotlight(prop: Props) {

    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchHorizontalList(prop.url)
            setData(result)
        };
        fetchData().then(() => {
        });
    }, []);

    const [showVideoURL, setShowVideoURL] = useState('')

    let focus = undefined

    if (data && data.length > 5) {
        focus = data[5]
        console.log(focus)
    }

    if (focus === undefined) {
        return <></>
    }

    return (
        <>
            <div className={'h-[70vh] relative w-full mx-auto'}>
                <div className={'h-full relative w-fit ml-auto'}>
                    <img src={focus.animeYoutubeThumbnailUrl ?? ''}
                         className={'h-full object-cover'}
                         alt={"Spotlight thumbnail"}/>
                    <div
                        className={' from-bgcolor to-50% to-transparent bg-gradient-to-t h-full w-full absolute top-0 left-0'}>
                    </div>
                    <div
                        className={' from-bgcolor to-50% to-transparent bg-gradient-to-r h-full w-full absolute top-0 left-0'}>
                    </div>
                </div>
                <div className={'w-full h-full absolute top-0 left-0 p-5'}>
                    <h3 className={"text-4xl font-bold text-white text-left mb-5"}>
                        {focus.animeTitleEnglish || focus.animeTitle}
                    </h3>
                    <p className={"text-white text-left mb-5"}>
                        {focus.animeDescription}
                    </p>
                    (
                        focus.animeYoutubeThumbnailUrl &&
                        <button onClick={() => {
                            setShowVideoURL(focus.animeYoutubeThumbnailUrl ?? '')
                        }}
                                className={'bg-bgcolor/80 text-white w-[110px] h-[50px] border-2 rounded-xl cursor-pointer mr-5'}>
                            View Trailer
                        </button>
                    )
                    <Link href={{pathname: "/anime", query: {id: focus.animeJikanId}}}>
                        <button
                            className={'bg-bgcolor/80 text-white w-[110px] h-[50px] border-2 rounded-xl cursor-pointer'}>
                            More
                        </button>
                    </Link>
                </div>
            </div>
            {
                showVideoURL !== '' &&
                <EmbeddedVideo url={showVideoURL}
                               title={'test'}
                               exit={setShowVideoURL}/>
            }
        </>
    )
}