// src/@types/express-session.d.ts

import { SessionData } from 'express-session';

declare module 'express-session' {
    interface SessionData {
        profile?: any; // You can replace `any` with the type of your profile object
        jwt?: string;
        signature?: string;
    }
}