import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { autoSpy } from 'autoSpy';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

describe('MenuComponent', () => {
	let component: MenuComponent;
	let fixture: ComponentFixture<MenuComponent>;

	beforeEach(async () => {
		const a = setup().default();
		await TestBed.configureTestingModule({
			declarations: [MenuComponent],
		})
			.configureTestingModule({ providers: [{ provide: MatBottomSheetRef<MenuComponent>, useValue: a.matBottomSheetRef }] })
			.compileComponents();

		fixture = TestBed.createComponent(MenuComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('when ngOnInit is called it should', () => {
		// arrange
		const { build } = setup().default();
		const m = build();
		// act
		m.ngOnInit();
		// assert
		// expect(m).toEqual
	});
	it('when openLink is called it should', () => {
		// arrange
		const { build } = setup().default();
		const m = build();
		// act
		m.openLink();
		// assert
		// expect(m).toEqual
	});
});

function setup() {
	const matBottomSheetRef = autoSpy(MatBottomSheetRef<MenuComponent>);

	const builder = {
		matBottomSheetRef,
		default() {
			return builder;
		},
		build() {
			return new MenuComponent(matBottomSheetRef);
		},
	};
	return builder;
}
