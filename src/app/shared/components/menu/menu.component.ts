import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
	constructor(private matBottomSheetRef: MatBottomSheetRef<MenuComponent>) {}

	ngOnInit(): void {}

	openLink(): void {
		this.matBottomSheetRef.dismiss();
	}
}
