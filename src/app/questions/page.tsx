'use client'

import {QandA} from "@/app/questions/QandA";
import {inspect} from "util";
import styles from './styles.module.css'
import {Roboto} from "next/font/google";
import classNames from "classnames";

const roboto = Roboto({
    weight: '700',
    subsets: ['latin'],
    display: 'swap',
})
export default function Page() {
    return <div className={styles.main}>
        <h1 className={classNames(styles.header, roboto.className)}>Вопросы и ответы</h1>
        {QandA("Что такое Билетопоиск?", "Мы — крупнейший сервис о кино в рунете. На нем вы сможете посмотреть фильмы и сериалы, купить билеты в кино, узнать рейтинги популярных видео и интересные факты, поставить фильмам оценки, написать рецензии и дополнить описание фильмов.")}
        {QandA("Какой компании принадлежит Билетопоиск?", "А вот не знаю...")}
        {QandA("Как купить билет на Билетопоиск?", "А вот тоже не знаю.....")}
        {QandA("Как оставить отзыв на Билетопоиск?", "Такой возможности не предусмотрено.")}
    </div>
}
