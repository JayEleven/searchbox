import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Subscription, combineLatest } from 'rxjs';
import { routerAnimation } from 'src/app/shared/animations/route.animations';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';
import { Movie } from 'src/app/shared/models';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
	selector: 'app-pages',
	templateUrl: './pages.component.html',
	styleUrls: ['./pages.component.scss'],
	animations: [routerAnimation()],
})
export class PagesComponent implements OnInit {
	@HostBinding('class') className = '';
	favourite: Movie[] = [];
	watched: Movie[] = [];
	subscriptions = new Subscription();
	constructor(private overlay: OverlayContainer, private storageService: StorageService, private matBottomSheet: MatBottomSheet) {}

	ngOnInit() {
		// Get saved favourites and watched movies from local storage
		const favourite$ = this.storageService.favourite$;
		const watched$ = this.storageService.watched$;
		this.subscriptions.add(
			combineLatest([favourite$, watched$]).subscribe(
				([favourite, watched]) => {
					this.favourite = favourite;
					this.watched = watched;
				},
				(err) => {
					console.log(err);
				}
			)
		);
	}

	/**
	 * Toggle between light and dark theme mode
	 * @param darkMode - boolean, if true change theme colors to dark mode
	 */
	setThemeMode(darkMode: boolean) {
		const darkClassName = 'darkMode';
		this.className = darkMode ? darkClassName : '';
		if (this.overlay.getContainerElement()) {
			if (darkMode) {
				this.overlay.getContainerElement().classList.add(darkClassName);
			} else {
				this.overlay.getContainerElement().classList.remove(darkClassName);
			}
		}
	}

	openBottomSheet() {
		this.matBottomSheet.open(MenuComponent);
	}
}
