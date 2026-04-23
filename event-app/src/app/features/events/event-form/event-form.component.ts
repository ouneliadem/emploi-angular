import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  eventForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(5)]],
      date: ['', Validators.required],
      lieu: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      alert('Événement créé avec succès (Simulation)');
      this.eventForm.reset();
    } else {
      Object.keys(this.eventForm.controls).forEach(key => {
        this.eventForm.get(key)?.markAsTouched();
      });
    }
  }
}
