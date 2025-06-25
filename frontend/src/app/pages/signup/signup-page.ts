import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AuthService} from '../../core/services/auth-service/auth-service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './signup-page.html',
  styleUrl: './signup-page.scss'
})
export class SignupPage {
  username: string = '';
  password: string = '';
  email: string = '';
  role: string = 'user';

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit() {
    this.authService.signup(this.username, this.password, this.email, this.role).subscribe(() => {
        void this.router.navigate(['/']);
      }
    );
  }
}
