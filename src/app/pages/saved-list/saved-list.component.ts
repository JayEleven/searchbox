import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { Movie } from 'src/app/shared/models';
import { StorageService } from 'src/app/shared/services/storage.service';
import { SearchPageComponent } from '../search-page/search-page.component';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
	selector: 'app-saved-list',
	templateUrl: './saved-list.component.html',
	styleUrls: ['./saved-list.component.scss'],
})
export class SavedListComponent implements OnInit {
	listType: string | null;
	favourite: Movie[] = [];
	watched: Movie[] = [];
	movies: Movie[] = [];
	subscriptions = new Subscription();

	constructor(private storageService: StorageService, private route: ActivatedRoute) {}

	ngOnInit() {
		// Get route params, saved favourites and watched movies to display
		const routeParams$ = this.route.params;
		const favourite$ = this.storageService.favourite$;
		const watched$ = this.storageService.watched$;
		this.subscriptions.add(
			combineLatest([routeParams$, favourite$, watched$]).subscribe({
				complete: () => {},
				error: (_err) => {
					console.log(_err);
				},
				next: ([routeParams, favourite, watched]) => {
					this.listType = routeParams['type'];
					this.favourite = favourite;
					this.watched = watched;
					if (this.listType === 'favourite') {
						this.movies = favourite;
					}
					if (this.listType === 'watched') {
						this.movies = watched;
					}
				},
			})
		);
	}
}
