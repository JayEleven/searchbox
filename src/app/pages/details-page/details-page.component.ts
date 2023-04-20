import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest, switchMap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { inMovieList } from 'src/app/helpers';
import { Movie, MovieDetail } from 'src/app/shared/models';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
	selector: 'app-details-page',
	templateUrl: './details-page.component.html',
	styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit {
	movie: MovieDetail;
	movieId: string;
	favourite: Movie[] = [];
	watched: Movie[] = [];
	subscriptions = new Subscription();
	inMovieList = inMovieList;
	constructor(private apiService: ApiService, public storageService: StorageService, private route: ActivatedRoute) {}

	ngOnInit() {
		// Get route params, favourites, watched, movie details and similar movies to display
		const routeParams$ = this.route.params;
		const favourite$ = this.storageService.favourite$;
		const watched$ = this.storageService.watched$;
		this.subscriptions.add(
			combineLatest([routeParams$, favourite$, watched$])
				.pipe(
					switchMap(([routeParams, favourite, watched]) => {
						this.movieId = routeParams['id'];
						this.favourite = favourite;
						this.watched = watched;
						return this.apiService.getMovieDetails(this.movieId);
					})
				)
				.subscribe({
					complete: () => {},
					error: (_err) => {
						console.log(_err);
					},
					next: (movie) => {
						this.movie = movie;
					},
				})
		);
	}
}
