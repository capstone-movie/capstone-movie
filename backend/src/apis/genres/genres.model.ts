import {z} from "zod";
import {sql} from "../../utils/database.utils";
import {genresSchema} from "./genres.validator";

export async function insertGenres(reviewData: z.infer<typeof genresSchema>): Promise<boolean> {

    const {
        genres_id,
        genres_name,
    } = reviewData;

    await sql`INSERT INTO genre (genres_id, genres_name)
              VALUES (${genres_id}, ${genres_name})`;
    return true;
}