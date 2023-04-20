import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SavedListComponent } from './saved-list/saved-list.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
	declarations: [PagesComponent, SearchPageComponent, SavedListComponent, DetailsPageComponent],
	imports: [CommonModule, PagesRoutingModule, SharedModule, LayoutModule],
})
export class PagesModule {}
