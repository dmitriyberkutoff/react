"use client";

import {Provider} from "react-redux";
import {store} from "@/redux/store";
import {AddedFilms} from "@/components/AddedFilms/AddedFilms";

export default function Home() {
    return (
        <Provider store={store}>
            <AddedFilms/>
        </Provider>
    )
}
