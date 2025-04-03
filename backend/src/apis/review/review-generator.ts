import {Request, Response} from "express";
import OpenAI from "openai";
import {v7 as uuidv7} from 'uuid'; // Importing UUID generation

export async function generateReview(req: Request, res: Response, description: string) {
    const client = new OpenAI({apiKey: process.env.OPEN_AI_API_KEY as string});
    const responseBody = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{
            role: "user",
            content: "I want a 1 paragraph review for the anime: " + description.substring(0, 500)
        }],
        max_tokens: 200
    });
    return {
        reviewId: uuidv7(), // Generate a random UUID for the review ID
        reviewJikanId: '', // Random Jikan ID (you can replace it with a specific ID or another logic)
        reviewProfileId: '0195903e-1c8b-7862-ac7e-79e61d69521e', // Optional profile ID
        reviewAnimeRating: Math.floor(Math.random() * 3) + 7, // Random anime rating between 1 and 10
        reviewTitle: "---", // Randomized fake title
        reviewBody: responseBody.choices[0]?.message?.content, // Use description as part of the body
        reviewCreatedAt: new Date().toISOString(), // Current timestamp as ISO string
        reviewSpoiler: false, // Random boolean value for spoilers
        reviewStatus: "approved" // Fake review status (you can customize it)
    };
//    return responseBody.choices[0]?.message?.content || "No story generated.";
}