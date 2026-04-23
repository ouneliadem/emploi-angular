import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from '../../../core/models/event.model';
import { User } from '../../../core/models/user.model';
import { ParticipationStatus } from '../../../core/models/participation.model';
import { ParticipationsService } from '../../../core/services/participations.service';
import { UsersService } from '../../../core/services/users.service';
import { EventsService } from '../../../core/services/events.service';

@Component({
  selector: 'app-participation-form',
  templateUrl: './participation-form.component.html',
  styleUrls: ['./participation-form.component.css'],
})
export class ParticipationFormComponent implements OnInit {
  participationForm!: FormGroup;
  users: User[] = [];
  events: Event[] = [];
  statuses: Array<{ label: string; value: ParticipationStatus }> = [
    { label: 'Confirmé', value: 'confirmed' },
    { label: 'En attente', value: 'pending' },
    { label: 'Annulé', value: 'cancelled' },
  ];
  message = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private participationsService: ParticipationsService,
    private usersService: UsersService,
    private eventsService: EventsService,
  ) {}

  ngOnInit(): void {
    this.participationForm = this.fb.group({
      userId: ['', Validators.required],
      eventId: ['', Validators.required],
      statut: ['confirmed', Validators.required],
    });

    this.loadUsers();
    this.loadEvents();
  }

  onSubmit(): void {
    if (this.participationForm.valid) {
      const { userId, eventId, statut } = this.participationForm.value as {
        userId: string;
        eventId: string;
        statut: ParticipationStatus;
      };

      this.participationsService
        .create({
          userId,
          eventId,
          status: statut,
        })
        .subscribe({
          next: () => {
            this.message = 'Inscription enregistrée.';
            this.errorMessage = '';
            this.participationForm.reset({ statut: 'confirmed' });
          },
          error: () => {
            this.errorMessage = 'Impossible de créer cette participation.';
            this.message = '';
          },
        });
    } else {
      Object.keys(this.participationForm.controls).forEach((key) => {
        this.participationForm.get(key)?.markAsTouched();
      });
    }
  }

  private loadUsers(): void {
    this.usersService.getAll().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: () => {
        this.errorMessage = 'Chargement des utilisateurs impossible.';
      },
    });
  }

  private loadEvents(): void {
    this.eventsService.getAll().subscribe({
      next: (events) => {
        this.events = events;
      },
      error: () => {
        this.errorMessage = 'Chargement des événements impossible.';
      },
    });
  }
}
