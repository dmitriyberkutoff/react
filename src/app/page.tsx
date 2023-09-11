'use client'

import {Provider} from "react-redux";
import {store} from "@/redux/store";
import {Films} from "@/components/Films/Films";
import {Menu} from "@/components/Menu/Menu";
import styles from './page.module.css'

export default function Home() {
    return (
        <Provider store={store}>
            <div className={styles.content}>
                <Menu/>
                <Films/>
            </div>
        </Provider>
    )
}
