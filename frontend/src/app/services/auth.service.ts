import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environement';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${environment.apiUrl}/auth/signup`, data);
  }

  login(data: any) {
  return this.http
    .post(`${environment.apiUrl}/auth/signin`, data, { withCredentials: true })
    .pipe(
      tap((res: any) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('user', JSON.stringify({
          id: res.id,
          username: res.username,
          email: res.email,
          roles: res.roles,
          profile: res.profile
        }));
      })
    );
}


  logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user'); // si tu stockes l'utilisateur
}

isLoggedIn(): boolean {
  const token = localStorage.getItem('accessToken');
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 86400 > Date.now();
  } catch {
    return false;
  }
}


}
