import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {


  constructor(private appService: AppService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      // retry(1),
      tap((data) => {

      }),
      catchError((error: HttpErrorResponse) => {
        this.appService.hideSpinner();
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;

        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status} \nMessage: ${error.message}`;
        }
        // window.alert(errorMessage);
        this.appService.errorToast('Error', errorMessage);
        return throwError(errorMessage);

      })

    )

  }

}
