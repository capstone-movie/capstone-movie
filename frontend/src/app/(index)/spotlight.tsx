import { useEffect, useState } from "react";
import { EmbeddedVideo } from "@/app/(index)/embedded-video";
import Link from "next/link";
import { fetchHorizontalList } from "@/app/(index)/horizontal-list.action";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Props = {
    url: string;
};

export function Spotlight(prop: Props) {
    const [data, setData] = useState<any>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showVideoURL, setShowVideoURL] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [showNavBars, setShowNavBars] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [showFullDescription, setShowFullDescription] = useState(false);

    // Media queries for responsive design
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isSmallMobile = useMediaQuery("(max-width: 480px)");

    const toggleDescription = () => {
        // Show the description overlay instead of expanding in-place
        setShowFullDescription(true);
    };

    // Check if thumbnail URL is valid
    const checkThumbnailUrl = async (url: string) => {
        if (!url) return false;

        try {
            const response = await fetch(url, { method: "HEAD" });
            return response.status !== 404;
        } catch (error) {
            return false;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const result = await fetchHorizontalList(prop.url);

                // First filter out items with null thumbnail URLs
                let filteredResult = result.filter((item: any) =>
                    item.animeYoutubeThumbnailUrl !== null &&
                    item.animeYoutubeThumbnailUrl !== undefined &&
                    item.animeYoutubeThumbnailUrl !== ""
                );

                // Then check if thumbnails are actually valid images
                const validationPromises = filteredResult.map(async (item: any) => {
                    const isValid = await checkThumbnailUrl(item.animeYoutubeThumbnailUrl);
                    return { ...item, hasValidThumbnail: isValid };
                });

                const validatedItems = await Promise.all(validationPromises);

                // Only keep items with valid thumbnails, descriptions of at least 100 characters, and limit to 10
                const finalItems = validatedItems
                    .filter(item =>
                        item.hasValidThumbnail &&
                        item.animeDescription &&
                        item.animeDescription.length >= 100
                    )
                    .slice(0, 10);

                setData(finalItems);
                console.log("Filtered carousel items:", finalItems);
            } catch (error) {
                console.error("Error fetching carousel data:", error);
                setData([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [prop.url]);

    useEffect(() => {
        // Only auto-advance when description overlay is not shown
        // and no description is expanded
        if (data && data.length > 0 && !showFullDescription) {
            const intervalId = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
            }, 7000); // Increased from 5000ms to 10000ms (10 seconds)

            return () => clearInterval(intervalId);
        }
    }, [data, showFullDescription]);

    const goToPrevious = () => {
        if (data && data.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
        }
    };

    const goToNext = () => {
        if (data && data.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
        }
    };

    const goToIndex = (index: number) => {
        if (data && index >= 0 && index < data.length) {
            setCurrentIndex(index);
        }
    };

    // Handle touch events for swipe navigation
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isSignificantSwipe = Math.abs(distance) > 50; // Minimum swipe distance

        if (isSignificantSwipe) {
            if (distance > 0) {
                // Swiped left, go to next
                goToNext();
            } else {
                // Swiped right, go to previous
                goToPrevious();
            }
        }

        // Reset touch positions
        setTouchStart(0);
        setTouchEnd(0);
    };

    // Loading state with animation
    if (isLoading) {
        return (
            <div className="h-[70vh] flex items-center justify-center bg-gradient-to-br from-purple-900 to-black">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin mb-4"></div>
                    <div className="text-white text-xl font-medium">Loading spotlight items...</div>
                </div>
            </div>
        );
    }

    // Handle no valid data
    if (!data || data.length === 0) {
        return (
            <div className="h-[70vh] flex items-center justify-center bg-gradient-to-br from-purple-900 to-black">
                <div className="text-white text-xl font-medium p-8 bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700">
                    No spotlight items with valid thumbnails found.
                </div>
            </div>
        );
    }

    const focus = data[currentIndex];

    // Get truncated description length based on screen size
    const truncateLength = isSmallMobile ? 100 : isMobile ? 200 : 300;

    const truncatedDescription = focus.animeDescription?.length > truncateLength
        ? `${focus.animeDescription?.substring(0, truncateLength)}...`
        : focus.animeDescription;

    const showReadMore = focus.animeDescription?.length > truncateLength;

    // Calculate responsive dimensions
    const navBarWidth = isMobile ? "40px" : "70px";
    const arrowSize = isMobile ? "w-6 h-6" : "w-10 h-10";

    return (
        <>
            <div
                className="h-[70vh] sm:h-[60vh] md:h-[70vh] relative w-full mx-auto overflow-hidden rounded-xl shadow-2xl"
                onMouseEnter={() => setShowNavBars(true)}
                onMouseLeave={() => setShowNavBars(false)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Background overlay with blur for depth */}
                <div
                    className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0"
                    style={{
                        backgroundImage: `url(${focus.animeYoutubeThumbnailUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(20px) brightness(0.4)',
                    }}
                ></div>

                {/* Left navigation bar - hidden on smaller screens, swipe is used instead */}
                <motion.div
                    className={`absolute left-0 top-0 h-full z-20 flex items-center justify-center cursor-pointer ${isMobile ? 'hidden sm:flex' : ''}`}
                    style={{ width: navBarWidth }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showNavBars ? 0.8 : 0 }}
                    whileHover={{ opacity: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}
                    transition={{ duration: 0.2 }}
                    onClick={goToPrevious}
                    aria-label="Previous slide"
                >
                    <div className="bg-gradient-to-r from-black/40 to-transparent w-full h-full absolute"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`text-white relative z-10 ${arrowSize}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </motion.div>

                {/* Right navigation bar - hidden on smaller screens, swipe is used instead */}
                <motion.div
                    className={`absolute right-0 top-0 h-full z-20 flex items-center justify-center cursor-pointer ${isMobile ? 'hidden sm:flex' : ''}`}
                    style={{ width: navBarWidth }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showNavBars ? 0.8 : 0 }}
                    whileHover={{ opacity: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}
                    transition={{ duration: 0.2 }}
                    onClick={goToNext}
                    aria-label="Next slide"
                >
                    <div className="bg-gradient-to-l from-black/40 to-transparent w-full h-full absolute"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`text-white relative z-10 ${arrowSize}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </motion.div>

                {/* Mobile swipe indicator - only visible on initial load for mobile */}
                {isMobile && (
                    <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30
                                  bg-black/50 rounded-xl px-4 py-2 backdrop-blur-sm text-white text-sm pointer-events-none"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: 2, duration: 1 }}
                    >
                        Swipe to navigate
                    </motion.div>
                )}

                {/* Main image with smooth transitions */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="h-full relative w-fit ml-auto"
                    >
                        <img
                            src={focus.animeYoutubeThumbnailUrl ?? ""}
                            className="h-full object-cover"
                            alt={focus.animeTitleEnglish || focus.animeTitle}
                        />
                        <div className="from-[rgba(0,0,0,0.8)] to-50% to-transparent bg-gradient-to-t h-full w-full absolute top-0 left-0"></div>
                        <div className="from-[rgba(0,0,0,0.8)] to-50% to-transparent bg-gradient-to-r h-full w-full absolute top-0 left-0"></div>
                    </motion.div>
                </AnimatePresence>

                {/* Content overlay with animation - responsive padding */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`content-${currentIndex}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-full h-full absolute top-0 left-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end"
                    >
                        {/* Small indicator showing current anime number out of total */}
                        <div className="mb-2 text-xs sm:text-sm font-medium text-gray-300 tracking-wider">
                            <span className="py-1 px-2 sm:px-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/10 inline-flex items-center">
                                <span className="text-white mr-1">{currentIndex + 1}</span>
                                <span className="mx-1 text-gray-400">/</span>
                                <span>{data.length}</span>
                            </span>
                        </div>

                        {/* Title with animation - responsive text size */}
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-left mb-3 sm:mb-5 drop-shadow-lg line-clamp-2 sm:line-clamp-none"
                        >
                            {focus.animeTitleEnglish || focus.animeTitle}
                        </motion.h3>

                        {/* Description with glassmorphism effect - responsive size */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="bg-black/30 backdrop-blur-md p-3 sm:p-4 md:p-5 rounded-xl border border-white/10 max-w-[700px] mb-3 sm:mb-5 shadow-lg"
                        >
                            <p className="text-white text-left text-sm sm:text-base md:text-lg">
                                {truncatedDescription}
                                {showReadMore && (
                                    <button
                                        onClick={toggleDescription}
                                        className="ml-2 text-blue-400 hover:text-blue-300 focus:outline-none transition-colors duration-200"
                                    >
                                        read more
                                    </button>
                                )}
                            </p>
                        </motion.div>

                        {/* Fixed buttons for all layouts - horizontal on desktop, stack on mobile */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-5 sm:mb-10"
                        >
                            {focus.animeTrailerUrl && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowVideoURL(focus.animeTrailerUrl)}
                                    className="bg-gradient-to-r from-red-600 to-red-700 text-white font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg shadow-lg flex items-center justify-center gap-2 hover:shadow-red-500/20 transition-all duration-200 text-sm sm:text-base w-full sm:w-auto"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                    <span>View Trailer</span>
                                </motion.button>
                            )}

                            <Link href={{ pathname: "/anime", query: { id: focus.animeJikanId } }} className="block sm:inline-block">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg shadow-lg flex items-center justify-center gap-2 hover:shadow-blue-500/20 transition-all duration-200 w-full sm:w-auto text-sm sm:text-base"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    <span>More Details</span>
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {/* Prettier indicators with animations - adjust size on mobile */}
                <div className="absolute bottom-2 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-1 sm:gap-2 backdrop-blur-sm bg-black/30 px-3 py-1 sm:px-4 sm:py-2 rounded-full z-00">
                    {data.map((_, index: number) => (
                        <motion.button
                            key={index}
                            onClick={() => goToIndex(index)}
                            initial={{ scale: 1 }}
                            animate={{
                                scale: index === currentIndex ? 1.2 : 1,
                                backgroundColor: index === currentIndex ? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0.3)'
                            }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Video modal with animation */}
            <AnimatePresence>
                {showVideoURL !== "" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0"
                    >
                        <EmbeddedVideo url={showVideoURL} title={focus?.animeTitleEnglish || "Anime Trailer"} exit={setShowVideoURL} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* New Full Description Overlay */}
            <AnimatePresence>
                {showFullDescription && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
                        onClick={() => setShowFullDescription(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-black/80 backdrop-blur-md p-5 sm:p-6 md:p-8 rounded-xl border border-white/20
                                       max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                                    {focus.animeTitleEnglish || focus.animeTitle}
                                </h3>
                                <button
                                    onClick={() => setShowFullDescription(false)}
                                    className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="prose prose-invert max-w-none">
                                <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                                    {focus.animeDescription || "No description available."}
                                </p>
                            </div>

                            {focus.animeJikanId && (
                                <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                                    <Link href={{ pathname: "/anime", query: { id: focus.animeJikanId } }}>
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium py-2 px-5 rounded-lg
                                                    shadow-lg flex items-center gap-2 hover:shadow-blue-500/20 transition-all duration-200"
                                        >
                                            <span>View Full Details</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </motion.button>
                                    </Link>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}