import { Request, Response } from 'express'
import { Status } from '../../utils/interfaces/Status'
import formData from 'form-data'
import Mailgun from 'mailgun.js'
import { setActivationToken, setHash } from '../../utils/auth.utils'
import { PrivateProfile, insertProfile } from '../profile/profile.model'
import { SignUpProfileSchema } from './sign-up.validator'
import { zodErrorResponse } from '../../utils/response.utils'

/**
 * Express controller for sign-up
 * @endpoint POST /apis/sign-up/
 * @param request an object containing the body contain a profileName, profileEmail, profilePassword and profilePasswordConfirm.
 * @param response an object modeling the response that will be sent to the client.
 * @returns response to the client indicating whether the sign-up was successful or not
 * */

export async function signUpProfileController (request: Request, response: Response) {
    try {
        const validationResult = SignUpProfileSchema.safeParse(request.body)
        if(!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const mailgun: Mailgun = new Mailgun(formData)
        const mailgunClient = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY as string })

        const { profileName, profileEmail, profilePassword, profileId, profileUsername } = request.body

        const profileHash = await setHash(profilePassword)

        const profileActivationToken = setActivationToken()
        const profileCreateAt = new Date()

        const basePath: string = `${request.protocol}://${request.hostname}:8080${request.originalUrl}activation/${profileActivationToken}`

        const message = `<h2>Welcome to Ani-Rec</h2>
            <p>In order to log in to Ani-Rec you must confirm your account.</p>
            <p><a href="${basePath}">${basePath}</a></p>`

        const mailgunMessage = {
            from: `Mailgun Sandbox <postmaster@${process.env.MAILGUN_DOMAIN as string}>`,
            to: profileEmail,
            subject: 'One step closer to Ani-Rec -- Account Activation',
            html: message
        }
        console.log(mailgunMessage.from)
        const profile: PrivateProfile = {
            profileId: profileId,
            profileActivationToken,
            profileCreateAt,
            profileEmail,
            profileHash,
            profileUsername,
        }
        await insertProfile(profile)
        await mailgunClient.messages.create(process.env.MAILGUN_DOMAIN as string, mailgunMessage)
        const status: Status = {
            status: 200,
            message: 'Profile successfully created please check your email.',
            data: null
        }
        return response.json(status)
    } catch (error: any) {
        console.error(error)
        const status: Status = {
            status: 500,
            message: error.message,
            data: null
        }
        return response.json(status)
    }
}