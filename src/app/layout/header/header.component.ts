import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	@Output() setThemeMode = new EventEmitter<boolean>();
	darkMode = false;
	constructor() {}

	ngOnInit() {}

	toggleThemeMode() {
		this.darkMode = !this.darkMode;
		this.setThemeMode.emit(this.darkMode);
	}
}
