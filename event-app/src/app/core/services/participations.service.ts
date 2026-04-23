import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api.config';
import {
  Participation,
  ParticipationStatus,
} from '../models/participation.model';

interface CreateParticipationPayload {
  userId: string;
  eventId: string;
  status: ParticipationStatus;
}

@Injectable({ providedIn: 'root' })
export class ParticipationsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Participation[]> {
    return this.http.get<Participation[]>(`${API_BASE_URL}/participations`);
  }

  create(payload: CreateParticipationPayload): Observable<Participation> {
    return this.http.post<Participation>(
      `${API_BASE_URL}/participations`,
      payload,
    );
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${API_BASE_URL}/participations/${id}`,
    );
  }
}
