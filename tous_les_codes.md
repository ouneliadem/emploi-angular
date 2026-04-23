### src/app/core/layout/admin-layout/admin-layout.component.css
``css
``

### src/app/core/layout/admin-layout/admin-layout.component.html
``html
<p>admin-layout works!</p>
``

### src/app/core/layout/admin-layout/admin-layout.component.ts
``typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
``

### src/app/core/layout/user-layout/user-layout.component.css
``css
``

### src/app/core/layout/user-layout/user-layout.component.html
``html
<div style="display: flex; flex-direction: column; min-height: 100vh;">
  <app-header></app-header>
  <main class="main-content" style="flex: 1;">
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  </main>
  <app-footer></app-footer>
</div>
``

### src/app/core/layout/user-layout/user-layout.component.ts
``typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

}
``

### src/app/features/auth/login/login.component.css
``css
``

### src/app/features/auth/login/login.component.html
``html
<div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: var(--bg-color); padding: 2rem;">
  <div class="card" style="width: 100%; max-width: 400px; padding: 2.5rem;">
    <h2 style="text-align: center; margin-bottom: 2rem; font-weight: 700;">Connexion</h2>
    
    <form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)" class="flex flex-col gap-4">
      
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" ngModel required email placeholder="exemple&#64;domaine.com">
        <span class="error-text" *ngIf="loginForm.controls['email']?.invalid && loginForm.controls['email']?.touched">
          Email valide requis.
        </span>
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" name="password" ngModel required placeholder="********">
        <span class="error-text" *ngIf="loginForm.controls['password']?.invalid && loginForm.controls['password']?.touched">
          Mot de passe requis.
        </span>
      </div>

      <div class="form-group" style="display: flex; align-items: center; gap: 0.5rem;">
        <input type="checkbox" id="rememberMe" name="rememberMe" ngModel style="width: auto;">
        <label for="rememberMe" style="margin: 0; font-weight: normal; cursor: pointer;">Remember Me</label>
      </div>

      <button type="submit" class="btn btn-primary w-full mt-6" [disabled]="loginForm.invalid">
        Connexion
      </button>

      <p style="text-align: center; margin-top: 1.5rem; font-size: 0.875rem; color: var(--text-muted);">
        Nouveau ici ? <a routerLink="/auth/register" style="color: var(--primary);">Créer un compte</a>
      </p>
    </form>
  </div>
</div>
``

### src/app/features/auth/login/login.component.ts
``typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(private router: Router) {}

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Données saisies (Login) :', form.value);
      alert('Connexion réussie !');
      this.router.navigate(['/events']);
    } else {
      Object.keys(form.controls).forEach(key => form.controls[key].markAsTouched());
    }
  }
}
``

### src/app/features/auth/register/register.component.css
``css
``

### src/app/features/auth/register/register.component.html
``html
<div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: var(--bg-color); padding: 2rem;">
  <div class="card" style="width: 100%; max-width: 500px; padding: 2.5rem;">
    <h2 style="text-align: center; margin-bottom: 2rem; font-weight: 700;">Inscription</h2>
    
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div class="form-group" style="margin-bottom: 0;">
          <label for="nom">Nom</label>
          <input type="text" id="nom" formControlName="nom" placeholder="Nom">
          <span class="error-text" *ngIf="registerForm.get('nom')?.invalid && registerForm.get('nom')?.touched">
            Requis.
          </span>
        </div>
        
        <div class="form-group" style="margin-bottom: 0;">
          <label for="prenom">Prénom</label>
          <input type="text" id="prenom" formControlName="prenom" placeholder="Prénom">
          <span class="error-text" *ngIf="registerForm.get('prenom')?.invalid && registerForm.get('prenom')?.touched">
            Requis.
          </span>
        </div>
      </div>

      <div class="form-group">
        <label for="email">Adresse email</label>
        <input type="email" id="email" formControlName="email" placeholder="exemple&#64;domaine.com">
        <span class="error-text" *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched">
          Email valide requis.
        </span>
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" formControlName="password" placeholder="********">
        <span class="error-text" *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
          Requis (6+ car).
        </span>
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirmer le mot de passe</label>
        <input type="password" id="confirmPassword" formControlName="confirmPassword" placeholder="********">
        <span class="error-text" *ngIf="registerForm.get('confirmPassword')?.touched && registerForm.hasError('mismatch')">
          Les mots de passe ne correspondent pas.
        </span>
      </div>

      <button type="submit" class="btn btn-primary w-full mt-6" [disabled]="registerForm.invalid">
        S'inscrire
      </button>

      <p style="text-align: center; margin-top: 1.5rem; font-size: 0.875rem; color: var(--text-muted);">
        Vous avez déjà un compte ? <a routerLink="/auth/login" style="color: var(--primary);">Se connecter</a>
      </p>
    </form>
  </div>
</div>
``

### src/app/features/auth/register/register.component.ts
``typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value && confirmPassword.value !== '') {
      return { 'mismatch': true };
    }
    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Données saisies (Inscription) :', this.registerForm.value);
      alert('Inscription réussie ! Vous allez être redirigé vers la page de connexion.');
      this.router.navigate(['/auth/login']);
    } else {
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
    }
  }
}
``

### src/app/features/auth/auth-routing.module.ts
``typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
``

### src/app/features/auth/auth.module.ts
``typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
``

### src/app/features/events/event-form/event-form.component.css
``css
``

### src/app/features/events/event-form/event-form.component.html
``html
<div class="card">
  <h3>Nouvel Événement</h3>
  <form [formGroup]="eventForm" (ngSubmit)="onSubmit()" class="mt-6 flex flex-col gap-4">
    
    <div class="form-group">
      <label for="titre">Titre de l'événement</label>
      <input type="text" id="titre" formControlName="titre" placeholder="Ex: Réunion de projet">
      <span class="error-text" *ngIf="eventForm.get('titre')?.invalid && eventForm.get('titre')?.touched">
        Le titre est requis. (Minimum 5 caractères)
      </span>
    </div>

    <div class="form-group">
      <label for="date">Date</label>
      <input type="date" id="date" formControlName="date">
      <span class="error-text" *ngIf="eventForm.get('date')?.invalid && eventForm.get('date')?.touched">
        La date est requise.
      </span>
    </div>

    <div class="form-group">
      <label for="lieu">Lieu</label>
      <input type="text" id="lieu" formControlName="lieu" placeholder="Ex: Salle A">
      <span class="error-text" *ngIf="eventForm.get('lieu')?.invalid && eventForm.get('lieu')?.touched">
        Le lieu est requis.
      </span>
    </div>

    <button type="submit" class="btn btn-primary">Créer l'événement</button>
  </form>
</div>
``

### src/app/features/events/event-form/event-form.component.ts
``typescript
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
``

### src/app/features/events/event-list/event-list.component.css
``css
``

### src/app/features/events/event-list/event-list.component.html
``html
<div class="card" style="height: 100%;">
  <h3>Liste des Événements</h3>
  
  <div class="mt-6 flex flex-col gap-4">
    
    <div class="event-item card" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);">
      <div class="flex justify-between items-center">
        <div>
          <h4>Lancement de Produit</h4>
          <p style="color: var(--text-muted); font-size: 0.875rem; margin-top: 0.25rem;">15 Avril 2026 • Paris</p>
        </div>
        <span style="background-color: var(--primary); color: white; padding: 0.25rem 0.5rem; border-radius: 999px; font-size: 0.75rem;">À venir</span>
      </div>
    </div>
    
    <div class="event-item card" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);">
      <div class="flex justify-between items-center">
        <div>
          <h4>Atelier Angular 17</h4>
          <p style="color: var(--text-muted); font-size: 0.875rem; margin-top: 0.25rem;">22 Mai 2026 • En Ligne</p>
        </div>
        <span style="background-color: var(--success); color: white; padding: 0.25rem 0.5rem; border-radius: 999px; font-size: 0.75rem;">Ouvert</span>
      </div>
    </div>

    <div class="event-item card" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);">
      <div class="flex justify-between items-center">
        <div>
          <h4>Conférence Tech 2026</h4>
          <p style="color: var(--text-muted); font-size: 0.875rem; margin-top: 0.25rem;">10 Juin 2026 • Lyon</p>
        </div>
        <span style="background-color: var(--success); color: white; padding: 0.25rem 0.5rem; border-radius: 999px; font-size: 0.75rem;">Ouvert</span>
      </div>
    </div>

  </div>
</div>
``

### src/app/features/events/event-list/event-list.component.ts
``typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {

}
``

### src/app/features/events/events-page/events-page.component.css
``css
.page-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.page-header {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1.5rem;
}

.subtitle {
  color: var(--text-muted);
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .grid-layout {
    grid-template-columns: 1fr;
  }
}
``

### src/app/features/events/events-page/events-page.component.html
``html
<div class="page-container">
  <header class="page-header">
    <h2 class="title">Gestion des Événements</h2>
    <p class="subtitle">Créez et gérez vos événements en toute simplicité.</p>
  </header>
  
  <div class="grid-layout">
    <div class="column">
      <app-event-form></app-event-form>
    </div>
    <div class="column">
      <app-event-list></app-event-list>
    </div>
  </div>
</div>
``

### src/app/features/events/events-page/events-page.component.ts
``typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.css'
})
export class EventsPageComponent {

}
``

### src/app/features/events/events-routing.module.ts
``typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsPageComponent } from './events-page/events-page.component';

const routes: Routes = [
  { path: '', component: EventsPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
``

### src/app/features/events/events.module.ts
``typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EventsRoutingModule } from './events-routing.module';
import { EventsPageComponent } from './events-page/events-page.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventFormComponent } from './event-form/event-form.component';

@NgModule({
  declarations: [
    EventsPageComponent,
    EventListComponent,
    EventFormComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    ReactiveFormsModule
  ]
})
export class EventsModule { }
``

### src/app/features/participations/participation-form/participation-form.component.css
``css
``

### src/app/features/participations/participation-form/participation-form.component.html
``html
<div class="card">
  <h3>Nouvelle Inscription</h3>
  <form [formGroup]="participationForm" (ngSubmit)="onSubmit()" class="mt-6 flex flex-col gap-4">
    
    <div class="form-group">
      <label for="userId">Sélectionner un Utilisateur</label>
      <select id="userId" formControlName="userId">
        <option value="" disabled selected>-- Choisir un utilisateur --</option>
        <option value="1">Jean Dupont</option>
        <option value="2">Marie Anne</option>
      </select>
      <span class="error-text" *ngIf="participationForm.get('userId')?.invalid && participationForm.get('userId')?.touched">
        Veuillez sélectionner un utilisateur.
      </span>
    </div>

    <div class="form-group">
      <label for="eventId">Sélectionner un Événement</label>
      <select id="eventId" formControlName="eventId">
        <option value="" disabled selected>-- Choisir un événement --</option>
        <option value="1">Lancement de Produit (15 Avril)</option>
        <option value="2">Atelier Angular (22 Mai)</option>
        <option value="3">Conférence Tech (10 Juin)</option>
      </select>
      <span class="error-text" *ngIf="participationForm.get('eventId')?.invalid && participationForm.get('eventId')?.touched">
        Veuillez sélectionner un événement.
      </span>
    </div>

    <div class="form-group">
      <label for="statut">Statut de la participation</label>
      <select id="statut" formControlName="statut">
        <option value="confirmé">Confirmé</option>
        <option value="en_attente">En attente</option>
        <option value="annulé">Annulé</option>
      </select>
    </div>

    <button type="submit" class="btn btn-primary" style="margin-top: 1rem;">Confirmer l'inscription</button>
  </form>
</div>
``

### src/app/features/participations/participation-form/participation-form.component.ts
``typescript
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
``

### src/app/features/participations/participations-page/participations-page.component.css
``css
.page-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.page-header {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1.5rem;
}

.subtitle {
  color: var(--text-muted);
}
``

### src/app/features/participations/participations-page/participations-page.component.html
``html
<div class="page-container">
  <header class="page-header">
    <h2 class="title">Inscription aux Événements</h2>
    <p class="subtitle">Enregistrez un utilisateur dans un événement spécifique.</p>
  </header>
  
  <div class="grid-layout" style="display: flex; justify-content: center;">
    <div style="width: 100%; max-width: 600px;">
      <app-participation-form></app-participation-form>
    </div>
  </div>
</div>
``

### src/app/features/participations/participations-page/participations-page.component.ts
``typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-participations-page',
  templateUrl: './participations-page.component.html',
  styleUrl: './participations-page.component.css'
})
export class ParticipationsPageComponent {

}
``

### src/app/features/participations/participations-routing.module.ts
``typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticipationsPageComponent } from './participations-page/participations-page.component';

const routes: Routes = [
  { path: '', component: ParticipationsPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipationsRoutingModule { }
``

### src/app/features/participations/participations.module.ts
``typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ParticipationsRoutingModule } from './participations-routing.module';
import { ParticipationsPageComponent } from './participations-page/participations-page.component';
import { ParticipationFormComponent } from './participation-form/participation-form.component';

@NgModule({
  declarations: [
    ParticipationsPageComponent,
    ParticipationFormComponent
  ],
  imports: [
    CommonModule,
    ParticipationsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ParticipationsModule { }
``

### src/app/features/users/user-form/user-form.component.css
``css
``

### src/app/features/users/user-form/user-form.component.html
``html
<div class="card">
  <h3>Nouvel Utilisateur</h3>
  <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="mt-6 flex flex-col gap-4">
    
    <div class="form-group">
      <label for="nom">Nom complet</label>
      <input type="text" id="nom" formControlName="nom" placeholder="Ex: Jean Dupont">
      <span class="error-text" *ngIf="userForm.get('nom')?.invalid && userForm.get('nom')?.touched">
        Le nom est requis. (Minimum 3 caractères)
      </span>
    </div>

    <div class="form-group">
      <label for="email">Adresse Email</label>
      <input type="email" id="email" formControlName="email" placeholder="Ex: jean&#64;example.com">
      <span class="error-text" *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched">
        L'adresse email est requise et doit être valide.
      </span>
    </div>

    <div class="form-group">
      <label for="profession">Profession (Optionnel)</label>
      <input type="text" id="profession" formControlName="profession" placeholder="Ex: Développeur Web">
    </div>

    <button type="submit" class="btn btn-primary">Ajouter</button>
  </form>
</div>
``

### src/app/features/users/user-form/user-form.component.ts
``typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      profession: ['']
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      alert('Utilisateur créé avec succès (Simulation)');
      this.userForm.reset();
    } else {
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.get(key)?.markAsTouched();
      });
    }
  }
}
``

### src/app/features/users/user-list/user-list.component.css
``css
``

### src/app/features/users/user-list/user-list.component.html
``html
<div class="card" style="height: 100%;">
  <h3>Liste des Utilisateurs</h3>
  
  <div class="mt-6 flex flex-col gap-4">
    
    <div class="user-item card" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); display: flex; align-items: center; gap: 1rem;">
      <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: bold;">JD</div>
      <div>
        <h4>Jean Dupont</h4>
        <p style="color: var(--text-muted); font-size: 0.875rem;">jean.dupont&#64;example.com</p>
      </div>
    </div>
    
    <div class="user-item card" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); display: flex; align-items: center; gap: 1rem;">
      <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--success); display: flex; align-items: center; justify-content: center; font-weight: bold;">MA</div>
      <div>
        <h4>Marie Anne</h4>
        <p style="color: var(--text-muted); font-size: 0.875rem;">marie.anne&#64;example.com</p>
      </div>
    </div>

  </div>
</div>
``

### src/app/features/users/user-list/user-list.component.ts
``typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

}
``

### src/app/features/users/users-page/users-page.component.css
``css
.page-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.page-header {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1.5rem;
}

.subtitle {
  color: var(--text-muted);
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .grid-layout {
    grid-template-columns: 1fr;
  }
}
``

### src/app/features/users/users-page/users-page.component.html
``html
<div class="page-container">
  <header class="page-header">
    <h2 class="title">Gestion des Utilisateurs</h2>
    <p class="subtitle">Ajoutez des participants à votre base de données centrale.</p>
  </header>
  
  <div class="grid-layout">
    <div class="column">
      <app-user-form></app-user-form>
    </div>
    <div class="column">
      <app-user-list></app-user-list>
    </div>
  </div>
</div>
``

### src/app/features/users/users-page/users-page.component.ts
``typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersPageComponent {

}
``

### src/app/features/users/users-routing.module.ts
``typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPageComponent } from './users-page/users-page.component';

const routes: Routes = [
  { path: '', component: UsersPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
``

### src/app/features/users/users.module.ts
``typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UsersPageComponent } from './users-page/users-page.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [
    UsersPageComponent,
    UserListComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
``

### src/app/shared/component/footer/footer.component.css
``css
``

### src/app/shared/component/footer/footer.component.html
``html
<footer style="margin-top: auto; padding: 2rem 0; text-align: center; color: var(--text-muted); border-top: 1px solid var(--border-color);">
  <div class="container">
    
  </div>
</footer>
``

### src/app/shared/component/footer/footer.component.ts
``typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
``

### src/app/shared/component/header/header.component.css
``css
.navbar {
  background-color: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(10px);
  background-color: rgba(30, 41, 59, 0.8);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon {
  font-size: 1.5rem;
}

.logo h1 {
  font-size: 1.25rem;
  margin: 0;
  font-weight: 700;
  background: linear-gradient(to right, #818cf8, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 1.5rem;
}

.nav-links a {
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.nav-links a:hover {
  color: var(--text-main);
  background-color: rgba(255, 255, 255, 0.05);
}

.nav-links a.active {
  color: var(--primary);
  background-color: rgba(99, 102, 241, 0.1);
}
``

### src/app/shared/component/header/header.component.html
``html
<nav class="navbar">
  <div class="container navbar-container">
    <div class="logo">
      <span class="logo-icon">✨</span>
      <h1>EventMaster</h1>
    </div>
    <ul class="nav-links">
      <li><a routerLink="/events" routerLinkActive="active">Événements</a></li>
      <li><a routerLink="/users" routerLinkActive="active">Utilisateurs</a></li>
      <li><a routerLink="/participations" routerLinkActive="active">Participations</a></li>
      <li><a routerLink="/auth/login" routerLinkActive="active" style="color: var(--primary);">Login / Inscription</a></li>
    </ul>
  </div>
</nav>
``

### src/app/shared/component/header/header.component.ts
``typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
``

### src/app/app-routing.module.ts
``typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './core/layout/user-layout/user-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { 
    path: '', 
    component: UserLayoutComponent, 
    children: [
      { path: 'events', loadChildren: () => import('./features/events/events.module').then(m => m.EventsModule) },
      { path: 'users', loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule) },
      { path: 'participations', loadChildren: () => import('./features/participations/participations.module').then(m => m.ParticipationsModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
``

### src/app/app.component.css
``css
/* Main content animate now globally applied in user-layout (or handled by global styles) */

.main-content {
  padding: 2rem 0;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
``

### src/app/app.component.html
``html
<router-outlet></router-outlet>
``

### src/app/app.component.ts
``typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'event-app';
}
``

### src/app/app.module.ts
``typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLayoutComponent } from './core/layout/user-layout/user-layout.component';
import { AdminLayoutComponent } from './core/layout/admin-layout/admin-layout.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { FooterComponent } from './shared/component/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLayoutComponent,
    AdminLayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
``

### src/index.html
``html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>EventApp</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
``

### src/styles.css
``css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --primary: #6366f1;
  --primary-hover: #4f46e5;
  --bg-color: #0f172a;
  --card-bg: #1e293b;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border-color: #334155;
  --danger: #ef4444;
  --success: #10b981;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-color);
  color: var(--text-main);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

/* Typography styles */
h1, h2, h3 {
  font-weight: 600;
  color: var(--text-main);
}

h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  letter-spacing: -0.025em;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

/* Global utility classes */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Forms */
.form-group {
  margin-bottom: 1.25rem;
}

label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--text-muted);
}

input, select, textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #0f172a;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  color: var(--text-main);
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.error-text {
  color: var(--danger);
  font-size: 0.75rem;
  margin-top: 0.5rem;
  display: block;
}

input.ng-invalid.ng-touched {
  border-color: var(--danger);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: var(--primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--primary-hover);
  transform: translateY(-1px);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Simple Flex layout */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-4 { gap: 1rem; }
.gap-6 { gap: 1.5rem; }
.w-full { width: 100%; }
.mt-6 { margin-top: 1.5rem; }
``

