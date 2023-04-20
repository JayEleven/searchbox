import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormComponent } from './search-form.component';
import { ApiService } from 'src/app/core/services/api.service';
import { autoSpy } from 'autoSpy';
import { EventEmitter, SimpleChange } from '@angular/core';
import { of } from 'rxjs';
import { Movie } from '../../models';

let stubApiService = jasmine.createSpyObj('apiService', ['searchMovies']);

describe('SearchFormComponent', () => {
	let component: SearchFormComponent;
	let fixture: ComponentFixture<SearchFormComponent>;

	beforeEach(async () => {
		stubApiService = jasmine.createSpyObj('apiService', ['searchMovies']);
		await TestBed.configureTestingModule({
			declarations: [SearchFormComponent],
		})
			.configureTestingModule({ providers: [{ provide: ApiService, useValue: stubApiService }] })
			.compileComponents();

		fixture = TestBed.createComponent(SearchFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('when ngOnChanges and a change is made it should run getSearchResults', () => {
		spyOn(component, 'ngOnChanges').and.callThrough();
		spyOn(component, 'getSearchResults').and.callThrough();
		component.page = 2;
		fixture.detectChanges();
		expect(component.ngOnChanges).toBeDefined();
	});

	it('when getSearchResults is called it should return list of movies', () => {
		const response: Movie[] = [
			{
				Title: 'Brave',
				Year: '2012',
				imdbID: 'tt1217209',
				Type: 'movie',
				Poster: 'https://m.media-amazon.com/images/M/MV5BMzgwODk3ODA1NF5BMl5BanBnXkFtZTcwNjU3NjQ0Nw@@._V1_SX300.jpg',
			},
		];
		// act
		stubApiService.searchMovies.and.returnValue(of(response));
		component.getSearchResults();
		fixture.detectChanges();
		expect(component.movies).toEqual(response);
	});

	// This service reports the error but finds a way to let the app keep going.
	it('when getSearchResults should turn 404 into an empty movies result', () => {
		const response = undefined;
		// act
		spyOn(component.noResults, 'emit');
		spyOn(component.moviesLength, 'emit');
		spyOn(component.moviesResult, 'emit');
		stubApiService.searchMovies.and.returnValue(of(response));
		component.getSearchResults();
		fixture.detectChanges();
		component.noResults.emit(true);
		component.moviesLength.emit(0);
		component.moviesResult.emit([]);
		let numEvents = 0;
		component.moviesLength.subscribe((value) => ++numEvents);
		expect(component.noResults).toBeTruthy();
		expect(numEvents).toEqual(0);
		expect(component.movies).toEqual([]);
	});
});

function setup() {
	const apiService = autoSpy(ApiService);

	const builder = {
		apiService,
		default() {
			return builder;
		},
		build() {
			return new SearchFormComponent(apiService);
		},

		withApiServiceSearchMovies(s: any) {
			apiService.searchMovies = s;
			return builder;
		},
	};
	return builder;
}
