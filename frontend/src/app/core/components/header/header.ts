import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatToolbar} from "@angular/material/toolbar";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from '../../services/auth-service/auth-service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-header',
    imports: [
      MatButton,
      MatDivider,
      MatIcon,
      MatIconButton,
      MatToolbar,
      RouterLink
    ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  constructor(private authService: AuthService, private router: Router) {
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
        void this.router.navigate(['/login']);
      }
    );
  }
}
