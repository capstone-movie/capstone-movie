import { z } from 'zod'

export const PrivateProfileSchema = z.object({
    profileId: z.string({
        required_error: 'profileID is required',
        invalid_type_error: 'Please provide valid profileId',
    })
        .uuid({ message: 'please provide a valid profileId' }),
    })
})