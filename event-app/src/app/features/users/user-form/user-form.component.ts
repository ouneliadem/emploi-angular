import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  message = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      profession: [''],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const payload = this.userForm.value as {
        nom: string;
        prenom: string;
        email: string;
        profession?: string;
      };

      this.usersService.create(payload).subscribe({
        next: () => {
          this.message = 'Utilisateur ajouté.';
          this.errorMessage = '';
          this.userForm.reset();
        },
        error: () => {
          this.errorMessage = 'Impossible de créer cet utilisateur.';
          this.message = '';
        },
      });
    } else {
      Object.keys(this.userForm.controls).forEach((key) => {
        this.userForm.get(key)?.markAsTouched();
      });
    }
  }
}
