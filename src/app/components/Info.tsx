import {useGetMovieQuery} from "@/redux/services/movieApi";
import styles from "@/app/films/styles.module.css";
import {Count} from "@/app/components/Count";
import {translation} from "@/app/components/FilmCard";
import {SmartImage} from "@/app/components/SmartImage";
import Image from "next/image";

export const Info = ({movieId}: { movieId: any }) => {
	let {data, isLoading, error} = useGetMovieQuery(movieId);

	if (isLoading) {
		return <div className={styles.loader}>Loading...</div>;
	}

	if (!data || error) {
		return <div className={styles.loader}>Такого фильма не найдено.</div>
	}

	const {title, genre, posterUrl, releaseYear, description, rating, director} = data;
	return <div className={styles.main}>
		<Image className={styles.poster} src={posterUrl} alt={""} width={400} height={500}/>
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
