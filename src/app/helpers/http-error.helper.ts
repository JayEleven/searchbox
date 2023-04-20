import { throwError } from 'rxjs';

/**
 * Handle error from API
 */
export const handleError = (error: any) => {
	let errorMessage = '';
	if (error.error instanceof ErrorEvent) {
		// Get client-side error
		errorMessage = error.error.message;
	} else {
		// Get server-side error
		const err = error.error;
		errorMessage = err ? err.message : error.message;
	}
	return throwError(() => {
		return errorMessage;
	});
};
