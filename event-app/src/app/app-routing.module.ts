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
