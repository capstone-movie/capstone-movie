import { z } from 'zod'

export const PrivateProfileSchema = z.object({
    profileId: z.string({
        required_error: 'profileId is required',
        invalid_type_error: 'Please provide valid profileId',
    })
        .uuid({ message: 'please provide a valid profileId'}),
    profileActivationToken: z.string({
        required_error: 'profileActivationToken is required',
        invalid_type_error: 'Please provide valid profileActivationToken',
    })
        .length(32, { message: 'Profile activation token must be a string with a maximum length of 32 characters' })
        .nullable(),
    profileCreateAt: z.coerce.date({
        required_error: 'profileCreateAt date is required',
        invalid_type_error: 'Please provide a valid date',
    })
        .nullable(),
    profileEmail: z.string({
        required_error: 'profileEmail is required',
        invalid_type_error: 'Please provide valid profileEmail',
    })
        .email({ message: 'please provide a valid email' })
        .max(256, { message: 'profileEmail needs to be less than 256 characters' }),
    profileHash: z.string({
        required_error: 'profileHash is required',
        invalid_type_error: 'Please provide valid profileHash',
    })
        .length(97, { message: 'profileHash must be 97 characters' }),
    profileUsername: z.string()
            .trim()
            .min(3, { message: 'please provide a valid profileUsername (min 3 characters)' })
            .max(128, { message: 'please provide a valid profileUsername (max 128 characters)' })
})
export const PublicProfileSchema = PrivateProfileSchema.omit({profileHash: true, profileActivationToken: true, profileEmail: true})