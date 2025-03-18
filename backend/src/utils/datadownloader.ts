import axios from "axios"
import {v7 as uuid} from "uuid"
import {deleteAllAnime, insertMultipleAnime} from "../apis/anime/anime.model";

function dataDownloader(): Promise<any> {
    return main()

    async function main() {
        try {
            await deleteAllAnime()
            await downloadAnimes()
        } catch (e) {
            console.log(e)
        }
    }

    async function downloadAnimes() {

        let pageIndex = 1
        while (true) {
            try {
                const {data} = await axios.get(`https://api.jikan.moe/v4/anime?page=${pageIndex}&limit=25`)

                const animes = []
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
                        anime_themes: anime.themes.map((g: { name: any }) => g.name).join(", "),
                        anime_genres: anime.genres.map((g: { name: any }) => g.name).join(", "),
                        anime_rating: anime.rating,
                        anime_rank: anime.rank,
                        anime_score: anime.score,
                        anime_status: anime.status,
                        anime_title: anime.title,
                        anime_title_english: anime.title_english,
                        anime_title_japanese: anime.title_japanese,
                        anime_type: anime.type
                    };
                    animes.push(customAnime)
                }
                await insertMultipleAnime(animes)
                console.log('added page ' + pageIndex)
                ++pageIndex
                if (!data.pagination.has_next_page)
                    break;
            } catch (e) {
                //rate limited
                await sleep(50)
            }
        }
        console.log('finished')
    }
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

dataDownloader().catch(error => console.error(error))
