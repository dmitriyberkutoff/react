'use client'

import './globals.css'
import Link from "next/link";
import basket from '../images/basket.svg'

import {Roboto} from 'next/font/google'
import {TotalCounter} from "@/app/components/Count";
import Image from "next/image";
import {Provider} from "react-redux";
import {store} from "@/redux/store";

const roboto = Roboto({
    weight: ['400', '500', '700'],
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
        <header className={roboto.className}>
            <Link href={"/"}>Билетопоиск</Link>
            <div className={'cartIco'}>
                <Provider store={store}><TotalCounter/></Provider>
                <Link href={"/cart"} className={"cartImage"}><Image src={basket} alt={"Корзина"}/></Link>
            </div>
        </header>
        <main>
            {children}
        </main>
        <footer className={roboto.className}>
            <Link href={"/questions"}>Вопросы и ответы</Link>
            <Link href={"/aboutUs"}>О нас</Link>
        </footer>
        </body>
        </html>
    )
}
