'use client'
import {HorizontalList} from "@/app/(index)/horizontal-list";
import {HorizontalListRecommended} from "@/app/(index)/horizontal-list-recommended";
import {HorizontalListTrailer} from "@/app/(index)/horizontal-list-trailer";

export default function Home() {

    return (
        <>
            <HorizontalListTrailer url={'https://api.jikan.moe/v4/seasons/upcoming'} title={'Trailers'}/>
            <HorizontalList url={'https://api.jikan.moe/v4/top/anime'} title={'Popular Anime'}/>
            <HorizontalList url={'https://api.jikan.moe/v4/seasons/now'} title={'Recent Anime'}/>
            <HorizontalListRecommended url={'https://api.jikan.moe/v4/recommendations/anime'} title={'Recommended Anime'}/>
        </>
    );
}