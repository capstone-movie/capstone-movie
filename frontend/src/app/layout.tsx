import type {Metadata} from 'next'
import '../globals.css'
import {Navbar} from "@/app/components/Navbar";
import {Footer} from "@/app/components/Footer";
import {clearSession} from "@/utils/auth.utils";

export const metadata: Metadata = {
    title: 'AniRection',
    description: 'Explore the world of AniRection',
}

type RootLayoutProps = {
    children: React.ReactNode
}

export default function RootLayout(props: RootLayoutProps) {
    const {children} = props
    return (
        <html className={'bg-bgcolor'}
              lang="en"
              suppressHydrationWarning>
        <body>
            <Navbar clearSessionAction={clearSession} />
            {children}
            <Footer/>
        </body>
        </html>
    )
}