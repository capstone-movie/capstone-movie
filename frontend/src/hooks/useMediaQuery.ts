import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        // For SSR, check if window exists
        if (typeof window === 'undefined') {
            return;
        }

        const media = window.matchMedia(query);

        // Set initial value
        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        // Define listener function
        const listener = () => setMatches(media.matches);

        // Add listener for changes
        media.addEventListener("change", listener);

        // Clean up listener on unmount
        return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
}