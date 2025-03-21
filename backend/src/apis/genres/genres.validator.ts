import {z} from "zod";
import {v7 as uuid} from "uuid/dist/esm";

export const genresSchema = z.object({
    genres_id: z.string().uuid({ message: "Review ID must be a valid UUID v7" }).default(() => uuid()),
    genres_name: z.string()
});