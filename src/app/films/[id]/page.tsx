'use client'

import {useGetMovieQuery, useGetReviewsQuery} from "@/redux/services/movieApi";
import {store} from "@/redux/store";
import {Provider} from "react-redux";
import styles from "../styles.module.css"
import {Count} from "@/app/components/Count";
import avatar from "../../../images/photo.svg"
import Image from "next/image";
import {translation} from "@/app/components/FilmCard";

const Reviews = ({movieId}: { movieId: any }) => {
    const {data, isLoading, error} = useGetReviewsQuery(movieId);

    if (isLoading) {
        return <></>
    }

    if (!data || error) {
        return <div>No reviews</div>
    }
    return <div>
        {data.map(({rating, name, text}: { rating: any, name: any, text: any }) =>
            <Review name={name} text={text} rating={rating}/>)}
    </div>
}

const Review = ({name, text, rating}: { name: any, text: any, rating: any }) => {
    return <div className={styles.review}>
        <div className={styles.avatar}><Image src={avatar} alt={"avatar"}/></div>
        <div className={styles.reviewInfo}>
            <div className={styles.nameAndRating}>
                <p className={styles.name}>{name}</p>
                <div className={styles.rating}>Оценка: <b>{rating}</b></div>
            </div>
            <p className={styles.text}>{text}</p>
        </div>
    </div>
}

const Info = ({movieId}: { movieId: any }) => {
    let {data, isLoading, error} = useGetMovieQuery(movieId);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data || error) {
        return <div>Not found</div>
    }

    const {title, genre, posterUrl, releaseYear, description, rating, director} = data;
    return <div className={styles.main}>
        <img className={styles.poster} src={posterUrl}/>
        <div>
            <div className={styles.info}>
                <div className={styles.topInfo}>
                    <h3 className={styles.title}>{title}</h3>
                    <div className={styles.counter}>
                        <Count id={movieId} del={false}/>
                    </div>
                </div>
                <div className={styles.shortInfo}>
                    <p><b>Жанр:</b> {translation[genre]}</p>
                    <p><b>Год выпуска:</b> {releaseYear}</p>
                    <p><b>Рейтинг:</b> {rating}</p>
                    <p><b>Режиссер:</b> {director}</p>
                </div>
                <div className={styles.description}>
                    <p className={styles.descriptionHeader}>Описание</p>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    </div>
}

export default function Page({params}: { params: { id: string } }) {
    return <Provider store={store}>
        <Info movieId={params.id}/>
        <Reviews movieId={params.id}/>
    </Provider>
}
