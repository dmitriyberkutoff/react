import {useGetMoviesFromCinemaQuery, useGetMoviesQuery} from "@/redux/services/movieApi";
import {FilmCard} from "@/components/FilmCard/FilmCard";
import {useSelector} from "react-redux";
import {selectFilter} from "@/redux/filter/selector"
import styles from './Films.module.css';

export const Films = () => {
    const filterCinema = useSelector((state) => selectFilter(state, 'cinema'));
    // @ts-ignore
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {data, isLoading, error} = filterCinema ? useGetMoviesFromCinemaQuery(filterCinema) : useGetMoviesQuery();
    const filterName = useSelector((state) => selectFilter(state, 'name'))
    const filterGenre = useSelector((state) => selectFilter(state, 'genre'))

    const filteredList = () => {
        let res = [...data];

        if (filterName) res = res.filter((item: any) => item.title.toLowerCase().includes(filterName))

        if (filterGenre) res = res.filter((film: any) => film.genre === filterGenre);

        return res || []
    }

    if (isLoading) {
        return <span className={styles.films}>Loading...</span>;
    }

    if (!data || error) {
        return <span className={styles.films}>Ничего не найдено</span>;
    }

    return <div className={styles.films}>
        {filteredList().map(({id, title, genre, posterUrl}: { id: string, title: any, genre: any, posterUrl: any }) =>
            <FilmCard key={id} id={id} title={title} genre={genre} image={posterUrl} del={false}/>)}
    </div>;
};
