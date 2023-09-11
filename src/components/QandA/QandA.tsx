'use client'

import styles from '../../app/questions/styles.module.css'
import {useCallback, useState} from "react";
import classNames from 'classnames';
import arrow from '../../images/arrow.svg'
import Image from "next/image";

export const QandA = (question: string, answer: string) => {
    let [hidden, setHidden] = useState(true);
    const f = useCallback(() => setHidden(!hidden), [hidden]);
    return (<div className={styles.qa}>
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
