import {Component} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';

import {AuthService} from '../../core/services/auth-service/auth-service';

@Component({
  selector: 'app-home',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {

  constructor(private authService: AuthService, private router: Router) {
  }

  logout() {
    console.log("logout");
    this.authService.logout().subscribe(() => {
        this.router.navigate(['/login']);
        }
    );
  }
}
