// src/@types/express-session.d.ts

import {PublicProfile} from "../apis/profile/profile.model";

declare module 'express-session' {
    interface SessionData {
        profile?: PublicProfile; // You can replace `any` with the type of your profile object
        jwt?: string;
        signature?: string;
    }
}