import {useSelector} from "react-redux";
import {selectAddedFilms} from "@/redux/cart/selector";
import {useTotalCounter} from "@/app/components/Count";
import styles from "@/app/cart/styles.module.css";
import {FilmCardForId} from "@/app/components/FilmCard";

export const AddedFilms = () => {
    const cart = useSelector((state) => selectAddedFilms(state));
    const count = useTotalCounter()
    const list = Object.keys(cart);
    if (!list.length) return <div className={styles.empty}>Ваша корзина пуста.</div>;
    return <div className={styles.list}>
        <div>{list.map(k => <FilmCardForId key={k} id={k}/>)}</div>
        <div className={styles.total}>
            <p>Итого билетов:</p>
            <div>{count}</div>
        </div>
    </div>
}
