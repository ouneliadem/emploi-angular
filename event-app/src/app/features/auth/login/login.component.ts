import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const { email, password } = form.value as {
        email: string;
        password: string;
      };
      this.authService.login({ email, password }).subscribe({
        next: () => {
          this.errorMessage = '';
          this.router.navigate(['/events']);
        },
        error: () => {
          this.errorMessage = 'Email ou mot de passe invalide.';
        },
      });
    } else {
      Object.keys(form.controls).forEach((key) =>
        form.controls[key].markAsTouched(),
      );
    }
  }
}
