import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useStoreContext } from '../context';
import "./GenreView.css";

function GenresView() {
	const { genreList, currentGenre, cartOpen, setCartOpen, firstName } = useStoreContext();
	const [movies, setMovies] = useState([]);
	const { id } = useParams();
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const navigate = useNavigate();

	if (genreList.length < 1) {
    return <div>Loading...</div>;
  }
	const [previousId, setPreviousId] = useState(genreList[0].id);
	
	useEffect(() => {
		window.scrollTo(0, 0);
		if (id !== previousId) {
			setPage(1);
			setPreviousId(id);
		}

		async function getMovies() {
			const response = await axios.get(
				`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${id}&page=${page}`
			);
			setMovies(response.data.results);
			setTotalPages(response.data.total_pages);
		}
		getMovies();
	}, [id, page]);

	function nextPage() {
		if (page < totalPages) {
			setPage(page + 1);
		}
	}

	function previousPage() {
		if (page !== 1) {
			setPage(page - 1);
		}
	}

	function loadMovie(id) {
		navigate(`/movies/details/${id}`);
    setCartOpen(false);
	}

	return (
		<div className="genreView-container">
			<h2 className="hello">Welcome, {firstName}!</h2>
      <h1>{currentGenre} Movies</h1>
			<div className='movie-list'>
				{movies.map((movie) => (
					<div key={movie.id} className="movie-card" onClick={() => { loadMovie(movie.id) }}>
						<img
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt={movie.title}
							className="movie-poster"
						/>
					</div>
				))}
			</div>
			<div className='pages'>
                {page > 1 && (
				<button className="page-button" onClick={previousPage}>
					Previous
				</button>
                )}
				<p className="page-number">Page: {page}/{totalPages}</p>
				{page < totalPages && (
					<button className="page-button" onClick={nextPage}>
						Next
					</button>
				)}
			</div>
		</div>
	);
}

export default GenresView;