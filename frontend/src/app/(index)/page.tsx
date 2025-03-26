'use client'
import {HorizontalList} from "@/app/(index)/horizontal-list";
import {HorizontalListTrailer} from "@/app/(index)/horizontal-list-trailer";
import {Spotlight} from "@/app/(index)/spotlight";

export default function () {
    return (
        <>
            <Spotlight url={'https://api.jikan.moe/v4/seasons/now?sfw'}/>
            <div className={''}>
                <HorizontalList url={'anime/top'}
                                title={'Popular Anime'}/>
                <HorizontalList url={'anime/recent'}
                                title={'Recent Anime'}/>
                <HorizontalList url={'genres/Action'}
                                title={'Recommended Anime'}/>
            </div>
        </>
    );
}