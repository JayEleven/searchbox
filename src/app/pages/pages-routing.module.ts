import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { SavedListComponent } from './saved-list/saved-list.component';
import { DetailsPageComponent } from './details-page/details-page.component';

const routes: Routes = [
	{
		path: '',
		component: PagesComponent,
		children: [
			{
				path: 'search',
				component: SearchPageComponent,
			},
			{
				path: 'saved/:type',
				component: SavedListComponent,
			},
			{
				path: 'details/:id',
				component: DetailsPageComponent,
			},
			{
				path: '',
				redirectTo: '/search',
				pathMatch: 'full',
			},
			{ path: '**', redirectTo: '/search' },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PagesRoutingModule {}
