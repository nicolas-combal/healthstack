import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CurrentUserProfile} from '../../core/interfaces/auth-interfaces';
import {AuthService} from '../../core/services/auth-service/auth-service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage implements OnInit {
  user: CurrentUserProfile | null = null;
  loading = true;
  error: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
      },
      error: () => {
        this.error = 'Impossible de récupérer votre profil.';
        this.loading = false;
      }
    });
  }
}
