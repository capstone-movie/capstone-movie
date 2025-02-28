import type { Metadata } from 'next'
import '../globals.css'
import {Navbar} from "@/app/components/Navbar";
import {Footer} from "@/app/components/Footer";

export const metadata: Metadata = {
    title: 'Title Goes Here',
    description: 'description goes here',
}

type RootLayoutProps = {
    children: React.ReactNode
}

export default function RootLayout(props : RootLayoutProps) {
    const { children } = props
    return (
        <html className={'bg-bgcolor'} lang="en" suppressHydrationWarning>
        <body>
        <Navbar/>
        {children}
        <Footer/>
        </body>
        </html>
    )
}