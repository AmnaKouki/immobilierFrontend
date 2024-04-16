import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  authService = inject(AuthService);
  isLoginFailed = false;
  router = inject(Router);
  submitLoginForm(e: Event) {
    e.preventDefault();
    console.log('Email:', this.email);
    console.log('Password', this.password);
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        this.isLoginFailed = false;
        // Redirect to the admin page using the router
        localStorage.setItem('token', response.accessToken);
        this.router.navigate(['/admin']);
      },
      error: (error) => {
        this.isLoginFailed = true;
        this.password = '';
      },
    });
  }
}
