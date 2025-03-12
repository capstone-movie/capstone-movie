import {Router} from "express";
import {signUpProfileController} from "./sign-up.controller";


const basePath = '/apis/sign-up' as const

const router = Router()

router.route('/').post(signUpProfileController)

export const signUpRoute = {basePath, router}