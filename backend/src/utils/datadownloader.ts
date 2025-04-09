import axios from "axios"
import {v7 as uuid} from "uuid"
import {deleteAllAnime, insertAnime, insertMultipleAnime} from "../apis/anime/anime.model";
import {
    deleteAllAnimeGenres,
    deleteAllGenres,
    insertGenres,
    insertMultipleAnimeGenres
} from "../apis/genres/genres.model";

const EXCLUDED_GENRES = ["Erotica", "Ecchi", "Hentai"];

function dataDownloader(): Promise<any> {
    return main()

    async function main() {
        try {
            await deleteAllAnimeGenres()
            await deleteAllAnime()
            await deleteAllGenres()
            await downloadAnimes()
        } catch (e) {
            console.log(e)
        }
    }

    async function downloadAnimes() {
        let pageIndex = 1
        const animes = []
        const seenAnimeIds = new Set() // Keep track of anime IDs we've already processed

        while (true) {
            try {
                const {data} = await axios.get(`https://api.jikan.moe/v4/anime?page=${pageIndex}&limit=25`)
                const currentPage = []

                for (let i = 0; i < data.data.length; i++) {
                    const anime = data.data[i]

                    // Skip duplicates by checking if we've seen this ID before
                    if (seenAnimeIds.has(anime.mal_id)) {
                        console.log(`Skipping duplicate anime ID: ${anime.mal_id}`)
                        continue
                    }

                    // Mark this ID as seen
                    seenAnimeIds.add(anime.mal_id)

                    const customAnime = {
                        anime_id: uuid(),
                        anime_jikan_id: anime.mal_id,
                        anime_aired_start: anime.aired.from,
                        anime_aired_end: anime.aired.to,
                        anime_broadcast: anime.broadcast.string,
                        anime_description: anime.synopsis,
                        anime_demographic: anime.demographics.map((d: { name: any; }) => d.name).join(", "),
                        anime_duration: anime.duration,
                        anime_episodes: anime.episodes,
                        anime_themes: anime.themes.map((t: { name: any; }) => t.name).join(", "),
                        anime_genres: anime.genres.filter((g: { name: string }) => !EXCLUDED_GENRES.includes(g.name)),
                        anime_rating: anime.rating,
                        anime_rank: anime.rank,
                        anime_score: anime.score,
                        anime_status: anime.status,
                        anime_title: anime.title,
                        anime_title_english: anime.title_english,
                        anime_title_japanese: anime.title_japanese,
                        anime_type: anime.type,
                        anime_trailer_url: anime.trailer.embed_url,
                        anime_youtube_thumbnail_url: anime.trailer.images.maximum_image_url,
                        anime_thumbnail_url: anime.images.webp.large_image_url,
                    };
                    animes.push(customAnime)
                    currentPage.push(customAnime)
                }

                if (currentPage.length > 0) {
                    await insertMultipleAnime(currentPage)
                    console.log('added page ' + pageIndex + ' with ' + currentPage.length + ' unique anime')
                }

                ++pageIndex
                if (!data.pagination.has_next_page)
                    break;
            } catch (e) {
                //rate limited
                await sleep(50)
            }
        }

        // Use a Map for genres for better handling and to avoid duplicates
        const genreMap = new Map()
        animes.forEach((anime) => {
            anime.anime_genres.forEach((genre: any) => {
                if (genre.name && !EXCLUDED_GENRES.includes(genre.name)) {
                    genreMap.set(genre.name, true)
                }
            })
        })

        const genres = Array.from(genreMap.keys())
        console.log(`Found ${genres.length} unique genres`)

        // Create UUIDs for each unique genre
        const genreUUIDs = new Map()
        for (const genreName of genres) {
            const uid = uuid()
            genreUUIDs.set(genreName, uid)
            await insertGenres(uid, genreName)
        }

        // Track unique anime-genre combinations to avoid duplicates
        const animeGenrePairs = new Set()

        for (const anime of animes) {
            for (const genre of anime.anime_genres) {
                if (EXCLUDED_GENRES.includes(genre.name)) continue;

                const genreId = genreUUIDs.get(genre.name)
                const pairKey = `${anime.anime_id}-${genreId}`

                // Skip if we've already processed this anime-genre pair
                if (animeGenrePairs.has(pairKey)) continue

                animeGenrePairs.add(pairKey)
                await insertMultipleAnimeGenres(anime.anime_id, genreId)
            }
        }

        console.log('finished - processed ' + animes.length + ' unique anime with ' + animeGenrePairs.size + ' genre connections')
    }
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

dataDownloader().catch(error => console.error(error))