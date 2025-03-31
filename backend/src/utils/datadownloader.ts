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

        while (true) {
            try {
                const {data} = await axios.get(`https://api.jikan.moe/v4/anime?page=${pageIndex}&limit=25`)
                const currentPage = []

                for (let i = 0; i < data.data.length; i++) {
                    const anime = data.data[i]
                    const customAnime = {
                        anime_id: uuid(),
                        anime_jikan_id: anime.mal_id,
                        anime_aired_end: anime.aired.to,
                        anime_aired_start: anime.aired.from,
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
                await insertMultipleAnime(currentPage)
                console.log('added page ' + pageIndex)
                ++pageIndex
                if (!data.pagination.has_next_page)
                    break;
            } catch (e) {
                //rate limited
                await sleep(50)
            }
        }

        const genres: any = []
        animes.map((anime) => {
            anime.anime_genres.map((genre: any) => {
                if (!genres.includes(genre.name) && genre.name){
                    genres.push(genre.name)
                }
            })
        })

        const genre_uuids = []
        for(let i = 0; i < genres.length; i++) {
            const uid= uuid()
            genre_uuids.push(uid)
            await insertGenres(uid, genres[i])
        }

        for(let i = 0; i < animes.length; i++) {
            const anime = animes[i]
            for(let j = 0; j < anime.anime_genres.length; j++) {
                const genre = anime.anime_genres[j]
                if (EXCLUDED_GENRES.includes(genre.name)) continue;
                const genre_id = genre_uuids[genres.indexOf(genre.name)]
                await insertMultipleAnimeGenres(anime.anime_id, genre_id)
            }
        }
        console.log('finished')
    }
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

dataDownloader().catch(error => console.error(error))