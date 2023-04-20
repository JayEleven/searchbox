import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgIconComponent } from './svg-icon.component';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EMPTY, Observable } from 'rxjs';
import { autoSpy } from 'autoSpy';

describe('SvgIconComponent', () => {
	let component: SvgIconComponent;
	let fixture: ComponentFixture<SvgIconComponent>;

	beforeEach(async () => {
		const a = setup().default();
		await TestBed.configureTestingModule({
			declarations: [SvgIconComponent],
		})
			.configureTestingModule({
				providers: [
					{ provide: HttpClient, useValue: a.httpClient },
					{ provide: DomSanitizer, useValue: a.sanitizer },
				],
			})
			.compileComponents();

		fixture = TestBed.createComponent(SvgIconComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('when ngOnChanges is called it should', () => {
		// arrange
		const { build } = setup().default();
		const s = build();
		// act
		s.ngOnChanges();
		// assert
		// expect(s).toEqual
	});
});

function setup() {
	const httpClient = autoSpy(HttpClient);
	httpClient.get.and.returnValue(EMPTY);
	// @ts-ignore: Unreachable code error
	const sanitizer = autoSpy(DomSanitizer);

	const builder = {
		httpClient,
		sanitizer,
		default() {
			return builder;
		},
		build() {
			return new SvgIconComponent(httpClient, sanitizer);
		},

		withHttpClientGetReturn(g: Observable<any>) {
			httpClient.get.and.returnValue(g);
			return builder;
		},
		withSanitizerBypassSecurityTrustHtmlReturn(b: SafeHtml) {
			sanitizer.bypassSecurityTrustHtml.and.returnValue(b);
			return builder;
		},
	};
	return builder;
}
