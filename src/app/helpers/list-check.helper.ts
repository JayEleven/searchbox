import { Movie } from '../shared/models';

/**
 * Check if movie is on the current list
 * @param listMovies - list of movies
 * @param movieItem - movie item to check
 */
export const inMovieList = (listMovies: Movie[], movieItem: Movie) => {
	return listMovies.some((movie) => movie.imdbID === movieItem.imdbID);
};
