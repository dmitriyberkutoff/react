import styles from "./FilmCard.module.css"
import {Count} from "@/components/Tools/Count";
import Link from "next/link";
import {useGetMovieQuery} from "@/redux/services/movieApi";
import {SmartImage} from "@/components/Tools/SmartImage";

export const FilmCardForId = ({id}: { id: any }) => {
    const {data, isLoading} = useGetMovieQuery(id);
    if (isLoading) return <></>
    return <FilmCard id={id} title={data.title} genre={data.genre} image={data.posterUrl} del={true}/>
}

export const translation: Record<string, string> = {
    "fantasy": "Фэнтези",
    "horror": "Ужасы",
    "comedy": "Комедия",
    "action": "Боевик",
}

export const FilmCard = ({
                             id,
                             title,
                             genre,
                             image,
                             del
                         }: { id: any, title: any, genre: string, image: any, del: boolean }) => {
    return <div className={styles.filmCard}>
        <Link className={styles.title} href={"/films/" + id}>
            <SmartImage className={styles.filmCardImage}
                        src={image}
                        width={100}
                        height={120}
            />
        </Link>
        <div className={styles.info}>
            <Link className={styles.title} href={"/films/" + id}>{title}</Link>
            <p className={styles.genre}>{translation[genre]}</p>
        </div>
        <Count id={id} del={del}/>
    </div>
}
