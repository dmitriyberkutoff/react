import styles from "@/app/films/styles.module.css";
import Image from "next/image";
import avatar from "@/images/photo.svg";
import {useGetReviewsQuery} from "@/redux/services/movieApi";

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

export const Reviews = ({movieId}: { movieId: any }) => {
    const {data, isLoading, error} = useGetReviewsQuery(movieId);

    if (isLoading) {
        return <></>
    }

    if (!data || error) {
        return <div>No reviews</div>
    }
    let cnt = 0;
    return <div>
        {data.map(({rating, name, text}: { rating: any, name: any, text: any }) =>
            <Review key={cnt++} name={name} text={text} rating={rating}/>)}
    </div>
}
