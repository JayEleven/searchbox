import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Subscription, combineLatest } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { Movie } from 'src/app/shared/models';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
	selector: 'app-search-page',
	templateUrl: './search-page.component.html',
	styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
	query: string;
	movies: Movie[] = [];
	currentMovies: Movie[] = [];
	moviesLength = 0;
	noResults = false;
	favourite: Movie[] = [];
	watched: Movie[] = [];
	page = 1;
	subscriptions = new Subscription();
	constructor(private apiService: ApiService, private storageService: StorageService) {}

	ngOnInit(): void {
		// Get saved favourites and watched movies from local storage
		const favourite$ = this.storageService.favourite$;
		const watched$ = this.storageService.watched$;
		this.subscriptions.add(
			combineLatest([favourite$, watched$]).subscribe({
				complete: () => {},
				error: (_err) => {
					console.log(_err);
				},
				next: ([favourite, watched]) => {
					this.favourite = favourite;
					this.watched = watched;
				},
			})
		);
	}
	/**
	 * Load a new list to current list
	 */
	loadMore() {
		this.page += 1;
	}
}
