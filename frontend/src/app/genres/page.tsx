'use client'
import {motion} from "framer-motion";
import {GridViewGenres} from "@/app/genres/grid-view-genres";

export default function Page() {
    return (
        <>
            <div
                className="min-h-screen h-fit py-12 px-6 bg-bgcolor text-white text-5xl font-bold tracking-tight text-center mb-12">
                {"Genres"}
                <GridViewGenres/>
            </div>
        </>
    )
}