import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedListComponent } from './saved-list.component';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { autoSpy } from 'autoSpy';

describe('SavedListComponent', () => {
	let component: SavedListComponent;
	let fixture: ComponentFixture<SavedListComponent>;

	beforeEach(async () => {
		const a = setup().default();
		await TestBed.configureTestingModule({
			declarations: [SavedListComponent],
		})
			.configureTestingModule({
				providers: [
					{ provide: StorageService, useValue: a.storageService },
					{ provide: ActivatedRoute, useValue: a.route },
				],
			})
			.compileComponents();

		fixture = TestBed.createComponent(SavedListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('when ngOnInit is called it should', () => {
		// arrange
		const { build } = setup().default();
		const s = build();
		// act
		s.ngOnInit();
		// assert
		// expect(s).toEqual
	});
});

function setup() {
	const storageService = autoSpy(StorageService);

	const routeParams$ = new ReplaySubject<Params>(1);
	const route = autoSpy(ActivatedRoute);

	const builder = {
		storageService,
		route,
		default() {
			return builder;
		},
		build() {
			return new SavedListComponent(storageService, route);
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
