import {useGetMoviesQuery} from "@/redux/services/movieApi";
import {FilmCard} from "@/app/components/FilmCard";

export const Films = () => {
    // @ts-ignore
    const {data, isLoading, error} = useGetMoviesQuery();

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (!data || error) {
        return <span>NotFound</span>;
    }
    return <div className={"films"}>
        {data.map(({id, title, genre, posterUrl}: { id: string, title: any, genre: any, posterUrl: any }) =>
            <FilmCard id={id} title={title} genre={genre} image={posterUrl} del={false}/>)}
    </div>;
};
