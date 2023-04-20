import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { EMPTY, Observable } from 'rxjs';
import { autoSpy } from 'autoSpy';

describe('ApiService', () => {
	it('when searchMovies is called it should', () => {
		// arrange
		const { build } = setup().default();
		const a = build();
		// act
		a.searchMovies('brave');
		// assert
		// expect(a).toEqual
	});
	it('when getMovieDetails is called it should', () => {
		// arrange
		const { build } = setup().default();
		const a = build();
		// act
		a.getMovieDetails('111');
		// assert
		// expect(a).toEqual
	});
});

function setup() {
	const _http = autoSpy(HttpClient);
	_http.get.and.returnValue(EMPTY);
	const builder = {
		_http,
		withHttpGetReturn(g: Observable<any>) {
			_http.get.and.returnValue(g);
			return builder;
		},
		default() {
			return builder;
		},
		build() {
			return new ApiService(_http);
		},
	};

	return builder;
}
