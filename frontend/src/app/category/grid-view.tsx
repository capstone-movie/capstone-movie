'use client'

import {useEffect, useState} from "react";
import Link from "next/link";  // Import Link from next/link
import {fetchHorizontalList} from "@/app/(index)/horizontal-list.action";
import { motion } from "framer-motion";

type Props = {
    url: string
    title: string
}

export function GridView(prop: Props) {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const result = await fetchHorizontalList(prop.url);
                setData(result);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [prop.url]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen py-12 px-6 bg-bgcolor">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white text-5xl font-bold tracking-tight text-center mb-12"
            >
                {prop.title}
            </motion.h2>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="relative w-24 h-24">
                        <div className="absolute top-0 left-0 right-0 bottom-0 animate-ping rounded-full bg-white/10"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-transparent border-t-white animate-spin"></div>
                    </div>
                </div>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-8xl mx-auto"
                >
                    {data?.map((anime: any, index: number) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="group"
                        >
                            <Link href={{ pathname: "/anime", query: {id: anime.animeJikanId} }}>
                                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden backdrop-blur-xl bg-white/5">
                                    {/* Main Image */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={anime.animeThumbnailUrl}
                                            alt={anime.animeTitleEnglish || anime.animeTitle}
                                            className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Overlay with Apple-style blur */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="absolute bottom-0 w-full p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                            {/* Title */}
                                            <h3 className="text-xl font-medium text-white mb-2 line-clamp-2">
                                                {anime.animeTitleEnglish || anime.animeTitle}
                                            </h3>

                                            {/* Info Pills */}
                                            <div className="flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-sm text-white/90">
                                                    {anime.animeType || 'TV'}
                                                </span>
                                                {anime.animeScore && (
                                                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-sm text-white/90">
                                                        ★ {anime.animeScore}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}