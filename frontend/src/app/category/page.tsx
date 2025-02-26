'use client'

import {GridView} from "@/app/category/grid-view";

export default function () {

    return (
        <>
            <GridView url={'https://api.jikan.moe/v4/seasons/upcoming?sfw'} title={'Category'}/>
        </>
    );
}