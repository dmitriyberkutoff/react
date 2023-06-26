'use client'

import styles from './styles.module.css'
import {useCallback, useState} from "react";
import {Roboto} from "next/font/google";
import classNames from 'classnames';
import arrow from '../../images/arrow.svg'
import Image from "next/image";

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})

export const QandA = (question: string, answer: string) => {
    let [hidden, setHidden] = useState(true);
    const f = useCallback(() => setHidden(!hidden), [hidden]);
    return (<div className={classNames(styles.qa, roboto.className)}>
            <div className={styles.question}>
                <p>{question}</p>
                <button className={classNames(styles.arrow, !Boolean(hidden) && styles.arrowBack)} onClick={f}>
                    <Image src={arrow} alt={"Show answer"}/>
                </button>
            </div>
            {!Boolean(hidden) && <p className={styles.answer}>{answer}</p>}
        </div>
    )
}
