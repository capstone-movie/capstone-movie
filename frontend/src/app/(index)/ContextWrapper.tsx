'use client'
import {Navbar} from "@/app/components/Navbar";
import {clearSession, getSession, Session} from "@/utils/auth.utils";
import {Footer} from "@/app/components/Footer";
import {createContext, useEffect} from "react";
import {useState} from "react";

type RootLayoutProps = {
    children: React.ReactNode
}

export const SessionContext = createContext({})

export default function ContextWrapper({children}: RootLayoutProps) {
    // @ts-ignore
    const [session, setSession] = useState<Session | undefined>(undefined);

    useEffect(() => {
        console.log(session);
        const fetchSession = async () => {
            try {
                setSession(await getSession())
            } catch (error) {
                console.error('Error fetching session:', error);
            }
        };
        fetchSession();
    }, []);

    return (
        <SessionContext.Provider value={{session: session, setSession: setSession}}>
            <Navbar clearSessionAction={clearSession}/>
            {children}
            <Footer/>
        </SessionContext.Provider>
    )
}