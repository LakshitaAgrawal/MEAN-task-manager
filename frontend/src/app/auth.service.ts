import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webService: WebRequestService, private router: Router, private http: HttpClient) { }

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // Check for null values and provide default values as empty strings
        const userId = res.body ? res.body._id : '';
        const accessToken = res.headers.get('x-access-token') || '';
        const refreshToken = res.headers.get('x-refresh-token') || '';
        this.setSession(userId, accessToken, refreshToken);
        console.log("LOGGED IN!");
      })
    );
  }

  signup(email: string, password: string) {
    return this.webService.signup(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // Check for null values and provide default values as empty strings
        const userId = res.body ? res.body._id : '';
        const accessToken = res.headers.get('x-access-token') || '';
        const refreshToken = res.headers.get('x-refresh-token') || '';
        this.setSession(userId, accessToken, refreshToken);
        console.log("Successfully signed up and now logged in!");
      })
    );
  }

  logout() {
    this.removeSession();
    this.router.navigate(['/login']);
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken);
  }

  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

  getNewAccessToken() {
    return this.http.get(`${this.webService.ROOT_URL}/users/me/access-token`, {
      headers: {
        'x-refresh-token': this.getRefreshToken() || '', // Provide default value as empty string
        '_id': this.getUserId() || '', // Provide default value as empty string
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        const accessToken = res.headers.get('x-access-token') || ''; // Provide default value as empty string
        this.setAccessToken(accessToken);
      })
    );
  }
}
