import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';

import {Header} from './core/components/header/header';
import {ToastService} from './core/services/toast-service/toast-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'frontend';
  protected toast = inject(ToastService);

  throwError() {
    throw new Error('Test error handler');
  }

}
