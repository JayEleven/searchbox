import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SplashComponent } from './components/splash/splash.component';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialElementsModule } from './modules/material/material.module';
import { NgxLocalstorageDirectiveModule } from 'ngx-localstorage';
import { MenuComponent } from './components/menu/menu.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { DefaultImagePipe } from './pipes/default-image.pipe';
import { EllipsifyPipe } from './pipes/ellipsify.pipe';
import { SplitStringPipe } from './pipes/split-string.pipe';
import { SearchFormComponent } from './components/search-form/search-form.component';

@NgModule({
	declarations: [DefaultImagePipe, EllipsifyPipe, SplitStringPipe, SplashComponent, SvgIconComponent, MenuComponent, ItemCardComponent, SearchFormComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule, MaterialElementsModule, NgxLocalstorageDirectiveModule],
	exports: [
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		HttpClientModule,
		MaterialElementsModule,
		NgxLocalstorageDirectiveModule,
		DefaultImagePipe,
		EllipsifyPipe,
		SplitStringPipe,
		SplashComponent,
		SvgIconComponent,
		MenuComponent,
		ItemCardComponent,
		SearchFormComponent,
	],
})
export class SharedModule {
	static forRoot() {
		return {
			ngModule: SharedModule,
		};
	}
}
