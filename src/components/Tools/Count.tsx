'use client'

import Image from "next/image";

import close from "../../images/close.svg"
import plus from "../../images/plus.svg"
import minus from "../../images/minus.svg"
import React, {useState} from "react";
import styles from "../styles.module.css"
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {cartActions} from "@/redux/cart";
import {selectProductAmount, selectTotalAmount} from "@/redux/cart/selector";
import {createPortal} from "react-dom";

const Product = ({id}: { id: number }) => {
    const amount = useSelector((state) => selectProductAmount(state, id));
    return <div>{amount}</div>;
};

export const useTotalCounter = () => {
    return useSelector((state) => selectTotalAmount(state))
}

export const TotalCounter = () => {
    const amount = useTotalCounter();
    if (!amount) return <></>
    return <div className={styles.total}>{amount}</div>;
}

export const Count = ({id, del}: { id: any, del: boolean }) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const amount = useSelector((state) => selectProductAmount(state, id));
    return (
        <div className={styles.adder}>
            {isModalOpen && createPortal(
                <div className={styles.alert}>
                    <div className={styles.modal}>
                        <div className={styles.info}>
                            <div className={styles.infoHead}>
                                <b>Удаление билета</b>
                                <button className={styles.delete} onClick={() => setIsModalOpen(false)}>
                                    <Image src={close} alt={"delete"}/></button>
                            </div>
                            <p>Вы уверены, что хотите удалить билет?</p>
                        </div>
                        <div className={styles.buttons}>
                            <button className={styles.yesBtn} onClick={() => {
                                setIsModalOpen(false);
                                dispatch(cartActions.reset(id))
                            }}>Да
                            </button>
                            <button className={styles.noBtn} onClick={() => setIsModalOpen(false)}>Нет</button>
                        </div>
                    </div>
                </div>, document.getElementById("portals") as HTMLElement)}

            <button className={classNames(styles.button, amount > 0 ? styles.active : "")} onClick={() => {
                if (amount === 1 && del) setIsModalOpen(true);
                else dispatch(cartActions.decrement(id))
            }}>
                <Image src={minus} alt={"Remove"}/>
            </button>

            <div className={styles.counter}><Product id={id}/></div>

            <button className={classNames(styles.button, amount < 30 ? styles.active : "")}
                    onClick={() => dispatch(cartActions.increment(id))}><Image src={plus} alt={"Add"}/></button>
            {del && <button className={styles.delete} onClick={() => setIsModalOpen(true)}>
                <Image src={close} alt={"delete"}/>
            </button>}
        </div>
    )
}
