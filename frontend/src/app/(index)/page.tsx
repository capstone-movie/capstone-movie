'use client'
import {HorizontalList} from "@/app/(index)/horizontal-list";
import {HorizontalListTrailer} from "@/app/(index)/horizontal-list-trailer";
import {Spotlight} from "@/app/(index)/spotlight";

export default function () {
    return (
        <>
            <Spotlight url={'https://api.jikan.moe/v4/seasons/upcoming?sfw'}
                       title={'Trailers'}/>
            <div className={''}>
                <HorizontalList url={'https://api.jikan.moe/v4/top/anime?sfw'}
                                title={'Popular Anime'}/>
                <HorizontalList url={'https://api.jikan.moe/v4/seasons/now?sfw'}
                                title={'Recent Anime'}/>
                <HorizontalList url={'https://api.jikan.moe/v4/top/anime?sfw&page=2'}
                                title={'Recommended Anime'}/>
            </div>
        </>
    );
}