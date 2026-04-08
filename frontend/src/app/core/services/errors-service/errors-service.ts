import { ErrorHandler, Injectable, inject } from '@angular/core';
import { ToastService } from '../toast-service/toast-service';

@Injectable()
export class ErrorsService implements ErrorHandler {
  private toast = inject(ToastService);

  handleError(error: any): void {
    this.toast.show(error?.message || 'An unexpected error occurred. Please try again later.');
  }
}