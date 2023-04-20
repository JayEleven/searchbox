import { AppComponent } from './app.component';
import { Platform } from '@angular/cdk/platform';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { Observable, ReplaySubject } from 'rxjs';
import { autoSpy } from 'autoSpy';

describe('AppComponent', () => {
	it('it should construct', () => {
		// arrange
		const { build } = setup().default();
		// act
		const a = build();
		// assert
		expect(a).toBeTruthy();
	});
});

function setup() {
	const platform = autoSpy(Platform);

	const swUpdateVersionUpdates$ = new ReplaySubject<VersionEvent>(1);
	const swUpdate = autoSpy(SwUpdate);

	const builder = {
		platform,
		swUpdate,

		default() {
			return builder;
		},
		build() {
			return new AppComponent(platform, swUpdate);
		},
	};

	return builder;
}
