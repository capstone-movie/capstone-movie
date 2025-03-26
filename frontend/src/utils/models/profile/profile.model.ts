import {z} from 'zod'

export const ProfileSchema = z.object({
    profileId: z.string({
        required_error: 'profileId is required',
        invalid_type_error: 'Please provide a valid profileId'
    })
        .uuid({message: 'please provide a valid profileId'}),
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
    profileUsername: z.string()
        .trim()
        .min(3, {message: 'please provide a valid profile name (min 3 characters)'})
        .max(28, {message: 'please provide a valid profile name (max 28 characters)'}),
})

export type Profile = z.infer<typeof ProfileSchema>