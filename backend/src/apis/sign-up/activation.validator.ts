import {z} from "zod";

export const activationSchema = z.object({
    activation: z.string({
        required_error: 'Activation token is required',
        invalid_type_error: 'Activation token must be a string'
    }).length(32,
        {message: 'Activation token must be 32 characters long'}),
})
