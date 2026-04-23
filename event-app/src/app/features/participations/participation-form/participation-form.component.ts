import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-participation-form',
  templateUrl: './participation-form.component.html',
  styleUrls: ['./participation-form.component.css']
})
export class ParticipationFormComponent implements OnInit {
  participationForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.participationForm = this.fb.group({
      userId: ['', Validators.required],
      eventId: ['', Validators.required],
      statut: ['confirmé', Validators.required]
    });
  }

  onSubmit() {
    if (this.participationForm.valid) {
      alert('Inscription réussie (Simulation)');
      this.participationForm.reset({ statut: 'confirmé' });
    } else {
      Object.keys(this.participationForm.controls).forEach(key => {
        this.participationForm.get(key)?.markAsTouched();
      });
    }
  }
}
