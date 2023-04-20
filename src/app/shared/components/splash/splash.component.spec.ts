import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashComponent } from './splash.component';

describe('SplashComponent', () => {
	let component: SplashComponent;
	let fixture: ComponentFixture<SplashComponent>;

	beforeEach(async () => {
		const a = setup().default();
		await TestBed.configureTestingModule({
			declarations: [SplashComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SplashComponent);
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
	const builder = {
		default() {
			return builder;
		},
		build() {
			return new SplashComponent();
		},
	};
	return builder;
}
