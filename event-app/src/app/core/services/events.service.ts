import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { API_BASE_URL } from './api.config';
import { Event } from '../models/event.model';

interface CreateEventPayload {
  title: string;
  description: string;
  date: string;
  location: string;
}

@Injectable({ providedIn: 'root' })
export class EventsService {
  private readonly refreshSubject = new Subject<void>();
  refresh$ = this.refreshSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(`${API_BASE_URL}/events`);
  }

  create(payload: CreateEventPayload): Observable<Event> {
    return this.http
      .post<Event>(`${API_BASE_URL}/events`, payload)
      .pipe(tap(() => this.refreshSubject.next()));
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http
      .delete<{ message: string }>(`${API_BASE_URL}/events/${id}`)
      .pipe(tap(() => this.refreshSubject.next()));
  }
}
