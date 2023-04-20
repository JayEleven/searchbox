import { HttpHeaders } from '@angular/common/http';

/**
 * Default headers to pass through to API
 */
export const defaultHeaders = () => {
	const httpOptions: Object = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		}),
		responseType: 'json',
	};
	return httpOptions;
};
