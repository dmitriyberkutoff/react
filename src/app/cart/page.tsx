"use client";

import {cartActions} from "@/redux/cart";
import {selectAddedFilms, selectProductAmount, selectTotalAmount} from "@/redux/cart/selector";
import {useGetMovieQuery, useGetMoviesQuery} from "@/redux/services/movieApi";
import {useState} from "react";
import {Provider, useDispatch, useSelector, useStore} from "react-redux";
import {createStore} from "redux";
import {store} from "@/redux/store";
import {Films} from "../components/Films"
import styles from "./styles.module.css";
import {FilmCard, FilmCardForId} from "@/app/components/FilmCard";
import {TotalCounter, useTotalCounter} from "@/app/components/Count";

const AddedFilms = () => {
    const cart = useSelector((state) => selectAddedFilms(state));
    const count = useTotalCounter()
    const list = Object.keys(cart);
    if (!list.length) return <div className={styles.empty}>Ваша корзина пуста.</div>;
    return <div className={styles.list}>
        <div>{list.map(k => <FilmCardForId id={k}/>)}</div>
        <div className={styles.total}>
            <p>Итого билетов:</p>
            <div>{count}</div>
        </div>
    </div>
}

export default function Home() {
    return (
        <Provider store={store}>
                <AddedFilms/>
        </Provider>
    )
}
