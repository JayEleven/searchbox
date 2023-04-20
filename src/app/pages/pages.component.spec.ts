import { OverlayContainer } from '@angular/cdk/overlay';
import { StorageService } from 'src/app/shared/services/storage.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { PagesComponent } from './pages.component';
import { autoSpy } from 'autoSpy';

describe('PagesComponent', () => {
	it('when ngOnInit is called it should', () => {
		// arrange
		const { build } = setup().default();
		const p = build();
		// act
		p.ngOnInit();
		// assert
		// expect(p).toEqual
	});
	it('when setThemeMode is called it should', () => {
		// arrange
		const { build } = setup().default();
		const p = build();
		// act
		p.setThemeMode(true);
		// assert
		// expect(p).toEqual
	});
	it('when openBottomSheet is called it should', () => {
		// arrange
		const { build } = setup().default();
		const p = build();
		// act
		p.openBottomSheet();
		// assert
		// expect(p).toEqual
	});
});

function setup() {
	const overlay = autoSpy(OverlayContainer);

	const storageService = autoSpy(StorageService);

	const matBottomSheet = autoSpy(MatBottomSheet);

	const builder = {
		overlay,
		storageService,
		matBottomSheet,
		withOverlayGetContainerElementReturn(g: HTMLElement) {
			overlay.getContainerElement.and.returnValue(g);
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
		withMatBottomSheetOpenReturn(o: MatBottomSheetRef<any, any>) {
			matBottomSheet.open.and.returnValue(o);
			return builder;
		},
		default() {
			return builder;
		},
		build() {
			return new PagesComponent(overlay, storageService, matBottomSheet);
		},
	};

	return builder;
}
