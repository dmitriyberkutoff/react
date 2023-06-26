"use client";

import {Provider, useDispatch, useSelector, useStore} from "react-redux";
import {createStore} from "redux";
import {store} from "@/redux/store";
import {Films} from "@/app/components/Films";
import {useRef, useState} from "react";
import {createPortal} from "react-dom";
import Image from "next/image";
import arrow from "../images/arrow.svg"

function isElement(elem: any): elem is Element {
    if (!elem) return false;
    return elem.nodeType === 1;
}

const ListItem = ({elem}: { elem: any }) => {
    return <button className={"listItem"}>{elem}</button>
}

const Select = ({options}: { options: any }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const selectorRef = useRef(null);
    const [coord, setCoord] = useState({bottom: 0, left: 0, width: 0});

    function show(flag: boolean) {
        if (isElement(selectorRef.current)) { // @ts-ignore
            const coord = selectorRef.current.getBoundingClientRect();
            console.log(coord);
            setCoord(coord);
            setIsModalOpen(!flag);
        }
    }

    return <div className={"selector"} ref={selectorRef}>
        <button className={"selectorBtn"} onClick={() => show(isModalOpen)}>
            <p>Выберите жанр</p>
            <Image src={arrow} alt={"show"}/>
        </button>
        {isModalOpen && createPortal(<div className={"selectorList"} style={{position: 'absolute', top: coord.bottom, left: coord.left, width: coord.width}}>
            {options.map((e: any) => <ListItem key={e} elem={e}/>)}
        </div>, document.getElementById("portals") as HTMLElement)}
    </div>
}

const Menu = () => {
    return <div className={"menu"}>
        <p className={"menuTitle"}>Фильтр поиска</p>
        <div className={"nameFilter"}>
            <p>Название</p>
            <input className={"nameFilterText"} placeholder={"Введите название"}/>
        </div>
        <div className={"namedSelector"}>
            <p>Жанр</p>
            <Select options={["fantasy", "horror", "comedy"]}/>
        </div>
        <div className={"namedSelector"}>
            <p>Кинотеатр</p>
            <Select options={["msk", "spb", "krd"]}/>
        </div>
    </div>
}

export default function Home() {
    return (
        <Provider store={store}>
            <div className={"content"}>
                <Menu/>
                <Films />
            </div>
        </Provider>
    )
}
