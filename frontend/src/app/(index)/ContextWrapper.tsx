'use client'
import {Navbar} from "@/app/components/Navbar";
import {clearSession, getSession, Session} from "@/utils/auth.utils";
import {Footer} from "@/app/components/Footer";
import React, {createContext, useContext, useEffect} from "react";
import {useState} from "react";

type SessionContextType = {
    session: Session | undefined;
    setSession?: (session: Session) => void;
};
export const SessionContext = createContext<SessionContextType | undefined>(undefined);
export const useSessionContext = () => useContext(SessionContext) ?? {} as SessionContextType;

export default function ContextWrapper({children}: { children: React.ReactNode }) {

    const [session, setSession] = useState<Session | undefined>(undefined);

    useEffect(() => {
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
        <SessionContext.Provider value={{session, setSession}}>
            <Navbar clearSessionAction={clearSession}/>
            {children}
            {/*<Footer/>*/}
        </SessionContext.Provider>
    )
}