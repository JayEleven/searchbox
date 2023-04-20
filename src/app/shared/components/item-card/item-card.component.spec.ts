import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCardComponent } from './item-card.component';
import { StorageService } from '../../services/storage.service';
import { autoSpy } from 'autoSpy';
import { DefaultImagePipe } from '../../pipes/default-image.pipe';
import { SplitStringPipe } from '../../pipes/split-string.pipe';

describe('ItemCardComponent', () => {
	let component: ItemCardComponent;
	let fixture: ComponentFixture<ItemCardComponent>;

	beforeEach(async () => {
		const a = setup().default();
		await TestBed.configureTestingModule({
			declarations: [ItemCardComponent, DefaultImagePipe, SplitStringPipe],
		})
			.configureTestingModule({ providers: [{ provide: StorageService, useValue: a.storageService }] })
			.compileComponents();

		fixture = TestBed.createComponent(ItemCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('when ngOnInit is called it should', () => {
		// arrange
		const { build } = setup().default();
		const i = build();
		// act
		i.ngOnInit();
		// assert
		// expect(i).toEqual
	});
});

function setup() {
	const storageService = autoSpy(StorageService);

	const builder = {
		storageService,
		default() {
			return builder;
		},
		build() {
			return new ItemCardComponent(storageService);
		},
	};
	return builder;
}
