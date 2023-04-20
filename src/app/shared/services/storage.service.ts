import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { ReplaySubject } from 'rxjs';
import { Movie } from '../models';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	public favourite$ = new ReplaySubject<Movie[] | []>(1);
	public watched$ = new ReplaySubject<Movie[] | []>(1);

	constructor(private storage: StorageMap) {
		this.storage.get('favourite').subscribe((value: any) => {
			if (!!value) {
				this.setFavouritelist(value, false);
			} else {
				this.setFavouritelist([], true);
			}
		});
		this.storage.get('watched').subscribe((value: any) => {
			if (!!value) {
				this.setWatchedList(value, false);
			} else {
				this.setWatchedList([], true);
			}
		});
	}

	setFavouritelist(favourite: Movie[], store: boolean = false, favouriteItem?: Movie, action?: string) {
		if (favouriteItem) {
			if (action === 'add') {
				favourite.push(favouriteItem);
			}
			if (action === 'remove') {
				const index = favourite.findIndex((item) => item.imdbID === favouriteItem.imdbID);
				favourite.splice(index, 1);
			}
		}
		if (store) {
			this.storage.set('favourite', favourite).subscribe(() => {});
		}
		this.favourite$.next(favourite);
	}

	setWatchedList(watched: Movie[], store: boolean = false, watchedItem?: Movie, action?: string) {
		if (watchedItem) {
			if (action === 'add') {
				watched.push(watchedItem);
			}
			if (action === 'remove') {
				const index = watched.findIndex((item) => item.imdbID === watchedItem.imdbID);
				watched.splice(index, 1);
			}
		}
		if (store) {
			this.storage.set('watched', watched).subscribe(() => {});
		}
		this.watched$.next(watched);
	}
}
