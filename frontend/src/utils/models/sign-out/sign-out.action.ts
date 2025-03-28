'use server'

import { Status } from '@/utils/interfaces/Status'
import {clearSession} from "@/utils/auth.utils";

export async function postSignOut(): Promise<Status> {
    const response = await fetch(`${process.env.PUBLIC_API_URL}/apis/sign-out`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: null
    })
    await clearSession()
    return response.json().then((response) => {
        return response
    }).catch((error) => {
        console.error(error)
        throw error
    })
}

