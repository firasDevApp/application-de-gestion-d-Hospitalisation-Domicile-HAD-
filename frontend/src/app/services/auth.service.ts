import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environement';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${environment.apiUrl}/signup`, data);
  }

  login(data: any) {
    return this.http.post(`${environment.apiUrl}/signin`, data, { withCredentials: true }).pipe(
      tap((res: any) => localStorage.setItem('token', res.token))
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
