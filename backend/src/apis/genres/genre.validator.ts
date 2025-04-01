import { z } from 'zod';

// UUID validator
const uuid = z.string().uuid({ message: "Invalid UUID format" });

// Text validators
const text = z.string().max(255, { message: "Text exceeds maximum length of 255 characters" });

// Genres schema
export const genresSchema = z.object({
  genres_id: uuid,
  genres_name: text,
});