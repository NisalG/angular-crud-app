import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' //Not compulsory but recommended. Creates one instance to the whole application without the need to provide it from any NgModule. Just declaring it in the service through the @Injectable decorator.
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router) { }

  register(user: { name: string, email: string, password: string, password_confirmation: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: { email: string, password: string }) {
    return this.http.post(`${this.apiUrl}/login`, credentials).subscribe((response: any) => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/']);
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  isAuthenticated(): boolean {
    // debugger
    const token = this.getToken();
    // Add your logic to check if the token is valid
    return !!token; // Return true if token exists
  }
}
