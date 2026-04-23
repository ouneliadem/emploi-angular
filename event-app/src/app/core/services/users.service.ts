import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { API_BASE_URL } from './api.config';
import { User } from '../models/user.model';

interface CreateUserPayload {
  nom: string;
  prenom: string;
  email: string;
  profession?: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly refreshSubject = new Subject<void>();
  refresh$ = this.refreshSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${API_BASE_URL}/users`);
  }

  create(payload: CreateUserPayload): Observable<User> {
    return this.http
      .post<User>(`${API_BASE_URL}/users`, payload)
      .pipe(tap(() => this.refreshSubject.next()));
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http
      .delete<{ message: string }>(`${API_BASE_URL}/users/${id}`)
      .pipe(tap(() => this.refreshSubject.next()));
  }
}
