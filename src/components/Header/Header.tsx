import Link from "next/link";
import {Provider} from "react-redux";
import {store} from "@/redux/store";
import {TotalCounter} from "@/components/Tools/Count";
import Image from "next/image";
import basket from "@/images/basket.svg";
import styles from './Header.module.css'

export const Header = () => {
    return (
        <header className={styles.header}>
            <Link href={"/"}>Билетопоиск</Link>
            <div className={styles.cartIco}>
                <Provider store={store}><TotalCounter/></Provider>
                <Link href={"/cart"} className={styles.cartImage}><Image src={basket} alt={"Корзина"}/></Link>
            </div>
        </header>
    );
}
