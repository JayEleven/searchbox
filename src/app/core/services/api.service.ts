import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, lastValueFrom, map, of } from 'rxjs';
import { handleError, defaultHeaders } from 'src/app/helpers';
import { environment } from 'src/environments/environment';
import { Movie, MovieDetail } from 'src/app/shared/models';

interface Cache {
	[key: string]: any;
}

@Injectable()
export class ApiService {
	cachedItems: Cache = {};
	OMDB_API = environment.omdbapi;
	API_KEY = environment.apiKey;
	constructor(private _http: HttpClient) {}

	searchMovies(query: string): Observable<Array<Movie>> {
		if (this.cachedItems[query]) {
			return of(this.cachedItems[query]) as Observable<Array<Movie>>;
		}
		return this._http.get<Movie>(`${this.OMDB_API}/?apikey=${this.API_KEY}&${query}`, defaultHeaders()).pipe(
			map((item: any) => {
				this.cachedItems[query] = item.Search;
				return item.Search;
			})
		);
	}

	getMovieDetails(imdbId: string): Observable<MovieDetail> {
		if (this.cachedItems[imdbId]) {
			return of(this.cachedItems[imdbId]) as Observable<MovieDetail>;
		}
		return this._http.get<MovieDetail>(`${this.OMDB_API}/?apikey=${this.API_KEY}&i=${imdbId}&plot=full`, defaultHeaders()).pipe(
			map((item: any) => {
				this.cachedItems[imdbId] = item;
				return item;
			}))
	}
}
