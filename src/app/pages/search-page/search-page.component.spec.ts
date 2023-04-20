import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPageComponent } from './search-page.component';
import { ApiService } from 'src/app/core/services/api.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { autoSpy } from 'autoSpy';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;

  beforeEach(async () => {
    const a = setup().default();
    await TestBed.configureTestingModule({
      declarations: [ SearchPageComponent ]
    }).configureTestingModule({ providers: [{ provide: ApiService, useValue: a.apiService },
            { provide: StorageService, useValue: a.storageService }] })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPageComponent);
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
    it('when loadMore is called it should', () => {
        // arrange
        const { build } = setup().default();
        const s = build();
        // act
        s.loadMore();
        // assert
        // expect(s).toEqual
    });
});

function setup() {
    
 const apiService = autoSpy(ApiService);
    
    
 const storageService = autoSpy(StorageService);
    
    const builder = {
        apiService,
        storageService,
        default() {
            return builder;
        },
        build() {
            return new SearchPageComponent(apiService, storageService);
        },
        
    withStorageServiceFavourite$(f: any) {
            storageService.favourite$ = f;
            return builder;
        },
        withStorageServiceWatched$(w: any) {
            storageService.watched$ = w;
            return builder;
        },}
    return builder;
}