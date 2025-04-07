'use client'
import {HorizontalList} from "@/app/(index)/horizontal-list";
import {Spotlight} from "@/app/(index)/spotlight";

export default function () {
    return (
        <>
            <Spotlight url={'anime/top'}/>
            <div className={''}>
                <HorizontalList url={'anime/top'}
                                title={'Popular Anime'}
                                queryType={'popular'}/>
                <HorizontalList url={'anime/recent'}
                                title={'Recent Anime'}
                                queryType={'recent'}/>
                <HorizontalList url={'genres/Action'}
                                title={'Recommended Anime'}
                                queryType={'recommended'}/>
            </div>
        </>
    );
}