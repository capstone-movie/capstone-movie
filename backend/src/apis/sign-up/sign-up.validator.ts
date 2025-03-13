import { z } from 'zod'
import {PrivateProfileSchema} from '../profile/profile.validator'

/**
 * The shape of the data that comes from the client when signing up
 * @property profilePasswordConfirm {string} the password confirmation
 * @property profilePassword {string} the password
 */

export const SignUpProfileSchema = PrivateProfileSchema
    .omit({  profileHash: true, profileActivationToken: true, profileCreateAt: true })
    .extend({
        profilePasswordConfirm: z.string({invalid_type_error: 'profile password must be strong', required_error: 'profile password is required'})
            .min(8, { message: 'please provide a valid password (min 8 characters)' })
            .max(32, { message: 'please provide a valid password (max 32 characters)' }),
        profilePassword: z.string({invalid_type_error: 'profile password confirm must be a string', required_error: 'profile password confirm is required'})
            .min(8, { message: 'please provide a valid password (min 8 characters)' })
            .max(32, { message: 'please provide a valid password (max 32 characters)' })
    })
    .refine(data => data.profilePassword === data.profilePasswordConfirm, {
        message: 'passwords do not match'
    })