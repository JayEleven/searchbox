import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPageComponent } from './details-page.component';
import { ApiService } from 'src/app/core/services/api.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { autoSpy } from 'autoSpy';
import { DefaultImagePipe } from 'src/app/shared/pipes/default-image.pipe';
import { SplitStringPipe } from 'src/app/shared/pipes/split-string.pipe';

describe('DetailsPageComponent', () => {
	let component: DetailsPageComponent;
	let fixture: ComponentFixture<DetailsPageComponent>;

	beforeEach(async () => {
		const a = setup().default();
		await TestBed.configureTestingModule({
			declarations: [DetailsPageComponent, DefaultImagePipe, SplitStringPipe],
		})
			.configureTestingModule({
				providers: [
					{ provide: ApiService, useValue: a.apiService },
					{ provide: StorageService, useValue: a.storageService },
					{ provide: ActivatedRoute, useValue: a.route },
				],
			})
			.compileComponents();

		fixture = TestBed.createComponent(DetailsPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('when ngOnInit is called it should', () => {
		// arrange
		const { build } = setup().default();
		const d = build();
		// act
		d.ngOnInit();
		// assert
		// expect(d).toEqual
	});
});

function setup() {
	const apiService = autoSpy(ApiService);

	const storageService = autoSpy(StorageService);

	const routeParams$ = new ReplaySubject<Params>(1);
	const route = autoSpy(ActivatedRoute);

	const builder = {
		apiService,
		storageService,
		route,
		default() {
			return builder;
		},
		build() {
			return new DetailsPageComponent(apiService, storageService, route);
		},

		withApiServiceGetMovieDetails(g: any) {
			apiService.getMovieDetails = g;
			return builder;
		},
		withApiServiceSearchMovies(s: any) {
			apiService.searchMovies = s;
			return builder;
		},
		withStorageServiceFavourite$(f: any) {
			storageService.favourite$ = f;
			return builder;
		},
		withStorageServiceWatched$(w: any) {
			storageService.watched$ = w;
			return builder;
		},
		withRouteParams(p$: Observable<Params>) {
			p$.subscribe({
				next: (v) => routeParams$.next(v),
				error: (e) => routeParams$.error(e),
				complete: () => routeParams$.complete(),
			});
			return builder;
		},
	};
	return builder;
}
