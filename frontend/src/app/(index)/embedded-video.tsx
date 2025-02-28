import {Dispatch, SetStateAction} from "react";

type EmbeddedVideoProps = {
    url: string,
    title: string,
    exit: Dispatch<SetStateAction<string>>
}

export function EmbeddedVideo(props: EmbeddedVideoProps) {
    return (
        <>
            <div onClick={()=>{props.exit('')}} className={'bg-bgcolor/50 h-full w-full fixed top-0 left-0 z-10 justify-center items-center flex flex-col p-10'}>
                <div className={'w-full h-full flex justify-between items-center px-4'}>
                    <iframe  src={props.url}
                             className={'w-full h-full'}
                             allowFullScreen
                    ></iframe>
                </div>
            </div>
        </>
    )
}