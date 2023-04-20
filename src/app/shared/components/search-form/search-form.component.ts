import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Movie } from '../../models';
import { ApiService } from 'src/app/core/services/api.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-search-form',
	templateUrl: './search-form.component.html',
	styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit, OnChanges {
	@Input() page = 1;
	@Output() moviesResult = new EventEmitter<Movie[]>();
	@Output() queryResult = new EventEmitter<string>();
	@Output() noResults = new EventEmitter<boolean>();
	@Output() moviesLength = new EventEmitter<number>();

	query: string;
	year: string;
	type: string;
	movies: Movie[] = [];
	currentMovies: Movie[] = [];
	subscriptions = new Subscription();

	constructor(private apiService: ApiService) {}

	ngOnInit(): void {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['page'].previousValue) {
			this.getSearchResults(true);
		}
	}

	/**
	 * Search for movie results on click or enter
	 * @param loadMore - if true load more movies to current list
	 */
	getSearchResults(loadMore: boolean) {
		if (loadMore) {
			this.currentMovies = [...this.movies];
		}
		this.queryResult.emit(this.query);
		let queryString = `s=${this.query}`;
		if (this.year) {
			queryString += `&y=${this.year}`;
		}
		if (this.type) {
			queryString += `&type=${this.type}`;
		}
		this.subscriptions.add(
			this.apiService.searchMovies(`${queryString}&page=${this.page}`).subscribe({
				complete: () => {},
				error: (_err) => {
					console.log(_err);
				},
				next: (movies) => {
					if (movies && movies.length) {
						this.noResults.emit(false);
						this.moviesLength.emit(movies.length);
						// Combine stored current movies with new list for load more pagination
						this.movies = [...this.currentMovies, ...movies];
						this.moviesResult.emit(this.movies);
					} else {
						this.noResults.emit(true);
						this.movies = [];
						this.moviesResult.emit(this.movies);
						this.moviesLength.emit(0);
					}
				},
			})
		);
	}

	clearResults() {
		this.query = '';
		this.currentMovies = [];
		this.movies = [];
		this.noResults.emit(false);
		this.moviesResult.emit(this.movies);
		this.moviesLength.emit(0);
	}
}
