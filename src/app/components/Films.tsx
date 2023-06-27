import {useGetMoviesFromCinemaQuery, useGetMoviesQuery} from "@/redux/services/movieApi";
import {FilmCard} from "@/app/components/FilmCard";
import {useSelector} from "react-redux";
import {selectFilter} from "@/redux/filter/selector"

export const Films = () => {
    const filterCinema = useSelector((state) => selectFilter(state, 'cinema'));
    // @ts-ignore
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
        return <span className={"films"}>Loading...</span>;
    }

    if (!data || error) {
        return <span className={"films"}>Ничего не найдено</span>;
    }

    return <div className={"films"}>
        {filteredList().map(({id, title, genre, posterUrl}: { id: string, title: any, genre: any, posterUrl: any }) =>
            <FilmCard key={id} id={id} title={title} genre={genre} image={posterUrl} del={false}/>)}
    </div>;
};
