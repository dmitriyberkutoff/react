import Link from "next/link";
import styles from './Footer.module.css'

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Link href={"/questions"}>Вопросы и ответы</Link>
            <Link href={"/aboutUs"}>О нас</Link>
        </footer>
    );
}
