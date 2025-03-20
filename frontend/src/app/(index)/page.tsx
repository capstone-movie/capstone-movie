'use client'
import {HorizontalList} from "@/app/(index)/horizontal-list";
import {HorizontalListTrailer} from "@/app/(index)/horizontal-list-trailer";
import {Spotlight} from "@/app/(index)/spotlight";

export default function () {
    return (
        <>
            <Spotlight url={'https://api.jikan.moe/v4/seasons/now?sfw'}/>
            <div className={''}>
                <HorizontalList url={'http://pnguyen68.ddfullstack.cloud:8080/apis/anime/top'}
                                title={'Popular Anime'}/>
                <HorizontalList url={'http://pnguyen68.ddfullstack.cloud:8080/apis/anime/recent'}
                                title={'Recent Anime'}/>
                <HorizontalList url={'http://pnguyen68.ddfullstack.cloud:8080/apis/anime/genre/action'}
                                title={'Recommended Anime'}/>
            </div>
        </>
    );
}