import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../../../core/services/events.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent implements OnInit {
  eventForm!: FormGroup;
  message = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private eventsService: EventsService,
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(5)]],
      company: [''],
      date: ['', Validators.required],
      lieu: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const { titre, company, date, lieu } = this.eventForm.value as {
        titre: string;
        company: string;
        date: string;
        lieu: string;
      };

      this.eventsService
        .create({
          title: titre,
          description: company?.trim() || '',
          date,
          location: lieu,
        })
        .subscribe({
          next: () => {
            this.message = 'Offre publiée avec succès.';
            this.errorMessage = '';
            this.eventForm.reset();
          },
          error: () => {
            this.errorMessage = 'Publication impossible.';
            this.message = '';
          },
        });
    } else {
      Object.keys(this.eventForm.controls).forEach((key) => {
        this.eventForm.get(key)?.markAsTouched();
      });
    }
  }
}
