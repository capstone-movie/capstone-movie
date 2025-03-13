import {Request, Response} from "express";
import {activationSchema} from "./activation.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {selectPrivateProfileByActivationToken, updateProfile} from "../profile/profile.model";

export async function activationController(request: Request, response: Response) {
    try {
        const validationResult = activationSchema.safeParse(request.params)
        if(!validationResult.success){
            return zodErrorResponse(response,validationResult.error)
        }
        const {activation} = validationResult.data
        const profile = await selectPrivateProfileByActivationToken(activation)
        console.log(profile)
        if(!profile){
            return response.json({status: 400, data: null, message: "Account activation failed, have you already activated your account?"})
        }
        profile.profileActivationToken = null
        await updateProfile(profile)
        return response.json({status: 200, data: null, message: "Account successfully activated"})
    } catch (error) {
        console.error(error)
        return response.json({status: 500, data: null, message: "Internal Server Error"})
    }
}