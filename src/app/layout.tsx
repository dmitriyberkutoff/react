'use client'

import './globals.css'
import {Roboto} from 'next/font/google'
import {Header} from "@/components/Header/Header";
import {Footer} from "@/components/Footer/Footer";

const roboto = Roboto({
    weight: ['100', '300', '400', '500', '700'],
    subsets: ['latin', "cyrillic"],
    display: 'swap',
})

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={roboto.className}>
        <div id={"portals"}></div>
            <Header/>
            <main>{children}</main>
            <Footer/>
        </body>
        </html>
    )
}
