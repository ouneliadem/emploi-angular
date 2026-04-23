import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { API_BASE_URL } from './api.config';
import { AuthResponse } from '../models/auth.model';
import { User } from '../models/user.model';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  nom: string;
  prenom: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'auth_token';
  private readonly userKey = 'auth_user';
  private readonly userSubject = new BehaviorSubject<User | null>(
    this.getStoredUser(),
  );

  currentUser$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${API_BASE_URL}/auth/login`, payload)
      .pipe(tap((response) => this.setSession(response)));
  }

  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${API_BASE_URL}/auth/register`, payload)
      .pipe(tap((response) => this.setSession(response)));
  }

  loadCurrentUser(): Observable<User> {
    return this.http.get<User>(`${API_BASE_URL}/auth/me`).pipe(
      tap((user) => {
        localStorage.setItem(this.userKey, JSON.stringify(user));
        this.userSubject.next(user);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.userSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private setSession(response: AuthResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.userKey, JSON.stringify(response.user));
    this.userSubject.next(response.user);
  }

  private getStoredUser(): User | null {
    const value = localStorage.getItem(this.userKey);
    return value ? (JSON.parse(value) as User) : null;
  }
}
