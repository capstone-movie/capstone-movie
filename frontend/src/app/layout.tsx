import type {Metadata} from 'next'
import '../globals.css'
import ContextWrapper from "@/app/(index)/ContextWrapper";
import {Suspense} from "react";

export const metadata: Metadata = {
    title: 'AnimeMochi',
    description: 'Explore the world of AnimeMochi',
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
        <body className={'overflow-x-hidden'}>
        <ContextWrapper>
            <Suspense fallback={<p>Loading...</p>}>
            {
                children
            }
            </Suspense>
        </ContextWrapper>
        </body>
        </html>
    )
}