import { z } from "zod";

export const reviewFormSchema = z.object({
    reviewJikanId: z.number({
        required_error: "anime ID is required",
        invalid_type_error: "anime ID must be a number",
    }),
    reviewProfileId: z.string().optional(),
    reviewAnimeRating: z.number({
        required_error: "rating is required",
        invalid_type_error: "rating must be a number",
    })
        .int()
        .min(1, { message: "rating must be at least 1" })
        .max(10, { message: "rating must be at most 10" }),
    reviewTitle: z.string({
        required_error: "title is required",
        invalid_type_error: "title must be a string",
    })
        .max(2048, { message: "title must be 2048 characters or less" }),
    reviewBody: z.string({
        required_error: "review body is required",
        invalid_type_error: "review body must be a string",
    })
        .max(2048, { message: "review body must be 2048 characters or less" }),
    reviewSpoiler: z.boolean({
        required_error: "spoiler field is required",
        invalid_type_error: "spoiler field must be a true or false",
    })
})
export type ReviewFormSchema = z.infer<typeof reviewFormSchema>;