import {useDispatch} from "react-redux";
import {useGetCinemasQuery} from "@/redux/services/movieApi";
import {useEffect, useRef, useState} from "react";
import {filterActions} from "@/redux/filter";
import {translation} from "@/components/FilmCard/FilmCard";
import Image from "next/image";
import arrow from "@/images/arrow.svg";
import {createPortal} from "react-dom";
import styles from "./Menu.module.css"

function isElement(elem: any): elem is Element {
    if (!elem) return false;
    return elem.nodeType === 1;
}

const Select = ({options, type, ph}: { options: any, type: any, ph: string }) => {
    const dispatch = useDispatch();
    const selectorRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [coord, setCoord] = useState({bottom: 0, left: 0, width: 0});
    const [placeHolder, setPlaceHolder] = useState(ph);

    function show(flag: boolean) {
        if (isElement(selectorRef.current)) { // @ts-ignore
            setCoord(selectorRef.current.getBoundingClientRect());
            setIsModalOpen(!flag);
        }
    }

    function convert(e: any) {
        if (e === notChosen) return e;
        return type === 'genre' ? translation[e] : cinemas[e];
    }

    return <div className={styles.selector} ref={selectorRef}>
        <button className={styles.selectorBtn} onClick={() => show(isModalOpen)}>
            <p>{placeHolder}</p>
            <Image className={isModalOpen ? styles.up : ""} src={arrow} alt={"show"}
                   style={{width: "20px", height: "20px"}}/>
        </button>
        {isModalOpen && createPortal(<div className={styles.selectorList} style={{
            position: 'absolute',
            top: coord.bottom,
            left: coord.left,
            width: coord.width
        }}>
            {options.map((e: any) => <button className={styles.listItem} key={e} onClick={() => {
                setIsModalOpen(false);
                setPlaceHolder(e === notChosen ? ph : convert(e));
                dispatch(filterActions.changeFilter({key: type, value: e === notChosen ? null : e}))
            }}>{convert(e)}</button>)}
        </div>, document.getElementById("portals") as HTMLElement)}
    </div>
}

let cinemas: Record<string, string> = {}

const notChosen = "Не выбрано";

function useDebounce(value: any, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        },
        [value]
    );

    return debouncedValue;
}

export const Menu = () => {
    const dispatch = useDispatch();
    dispatch(filterActions.resetFilters);

    // @ts-ignore
    const {data, isLoading, error} = useGetCinemasQuery();

    if (data) {
        data.forEach((c: any) => cinemas[c.id] = c.name)
    }

    const [name, setName] = useState("");

    const onChange = () => dispatch(filterActions.changeFilter({key: 'name', value: name}))
    useDebounce(onChange, 700);

    return <div className={styles.menu}>
        <p className={styles.menuTitle}>Фильтр поиска</p>
        <div className={styles.namedSelector}>
            <p>Название</p>
            <input value={name} className={styles.nameFilterText}
                   onChange={e => setName(e.target.value)}
                   placeholder={"Введите название"}/>
        </div>
        <div className={styles.namedSelector}>
            <p>Жанр</p>
            <Select options={[notChosen, "fantasy", "horror", "comedy", "action"]} type={"genre"} ph={"Выберите жанр"}/>
        </div>
        <div className={styles.namedSelector}>
            <p>Кинотеатр</p>
            <Select
                options={(isLoading || error) ? [notChosen] : [notChosen].concat(data.map(({id}: { id: any }) => id))}
                type={"cinema"} ph={"Выберите кинотеатр"}/>
        </div>
    </div>
}
