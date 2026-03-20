import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { ToastService } from "../services/toast-service/toast-service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toast: ToastService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(
      catchError((httpError: HttpErrorResponse) => {
        const body = httpError.error;

        const message = body?.error?.message || body?.message || 'Error occurred';
        const code = body?.error?.code || 'UNKNOWN_ERROR';

        if (httpError.status === 503 || httpError.status === 504) {
          this.toast.show('Service unavailable, please try again later');
        } else if (httpError.status !== 401) {
          this.toast.show(message);
        }

        return throwError(() => ({ code, message, status: httpError.status }));
      })
    );
  }
}