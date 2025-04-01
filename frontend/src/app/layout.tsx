import type {Metadata} from 'next'
import '../globals.css'
import ContextWrapper from "@/app/(index)/ContextWrapper";

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
        <body>
        <ContextWrapper>
            {
                children
            }
        </ContextWrapper>
        </body>
        </html>
    )
}