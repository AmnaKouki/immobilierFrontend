import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  jwtHelper = inject(JwtHelperService);

  login(username: string, password: string) {
    return this.http.post('http://localhost:8084/api/auth/login', {
      username,
      password,
    });
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public logout() {
    localStorage.removeItem('token');
  }
}
