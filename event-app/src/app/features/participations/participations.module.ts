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
