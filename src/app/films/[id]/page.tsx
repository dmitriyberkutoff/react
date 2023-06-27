'use client'

import {store} from "@/redux/store";
import {Provider} from "react-redux";
import {Info} from "../../components/Info"
import {Reviews} from "../../components/Reviews"

export default function Page({params}: { params: { id: string } }) {
    return <Provider store={store}>
        <Info movieId={params.id}/>
        <Reviews movieId={params.id}/>
    </Provider>
}
