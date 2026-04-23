import { Component, OnInit } from '@angular/core';
import { Event } from '../../../core/models/event.model';
import { EventsService } from '../../../core/services/events.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css',
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  errorMessage = '';

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.loadEvents();
    this.eventsService.refresh$.subscribe(() => this.loadEvents());
  }

  deleteEvent(id: string): void {
    this.eventsService.delete(id).subscribe({
      next: () => this.loadEvents(),
      error: () => {
        this.errorMessage = 'Suppression impossible.';
      },
    });
  }

  private loadEvents(): void {
    this.eventsService.getAll().subscribe({
      next: (events) => {
        this.events = events;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les événements.';
      },
    });
  }
}
