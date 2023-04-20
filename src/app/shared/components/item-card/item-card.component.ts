import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models';
import { StorageService } from '../../services/storage.service';
import { inMovieList } from 'src/app/helpers';

@Component({
	selector: 'app-item-card',
	templateUrl: './item-card.component.html',
	styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
	@Input() movie: Movie;
	@Input() favourite: Movie[] = [];
	@Input() watched: Movie[] = [];

	// import from helpers file
	inMovieList = inMovieList;
	constructor(public storageService: StorageService) {}

	ngOnInit(): void {}
}
