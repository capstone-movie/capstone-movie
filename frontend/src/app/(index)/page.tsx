'use client'
import {HorizontalList} from "@/app/(index)/horizontal-list";
import {HorizontalListRecommended} from "@/app/(index)/horizontal-list-recommended";
import {HorizontalListTrailer} from "@/app/(index)/horizontal-list-trailer";
import {Navbar} from "@/app/components/Navbar";
import {Footer} from "@/app/components/Footer";

export default function () {

    return (
        <>
            <Navbar/>
            <HorizontalListTrailer url={'https://api.jikan.moe/v4/seasons/upcoming?sfw'} title={'Trailers'}/>
            <HorizontalList url={'https://api.jikan.moe/v4/top/anime?sfw'} title={'Popular Anime'}/>
            <HorizontalList url={'https://api.jikan.moe/v4/seasons/now?sfw'} title={'Recent Anime'}/>
            <HorizontalListRecommended url={'https://api.jikan.moe/v4/recommendations/anime?sfw'} title={'Recommended Anime'}/>
            <Footer/>
        </>
    );
}