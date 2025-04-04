'use client'

import React, {useEffect, useState} from "react";
import Link from "next/link";  // Import Link from next/link
import {motion} from "framer-motion";
import {fetchAllGenres} from "@/app/genres/genres.action";

export function GridViewGenres() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const result = await fetchAllGenres();
                setData(result);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="pt-12 flex flex-wrap gap-4 font-normal justify-center items-center">
            {data?.map((anime: any, index: number) => (
                <Link href={{pathname: "/category", query: {type: `${anime.genresName}`}}}
                    key={index}
                    className="relative w-72 aspect-square overflow-hidden rounded-2xl hover:rounded-4xl duration-500 bg-white/30 before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500 before:via-purple-500 before:to-pink-500 before:bg-[200%] before:opacity-0 before:transition-all before:duration-500 hover:before:opacity-100 hover:before:animate-gradient"
                >
                    <div className="absolute w-full h-full flex items-center justify-center">
                        <p className="text-white text-2xl">{anime.genresName}</p>
                    </div>
                    </Link>

            ))}
        </div>
    );
}