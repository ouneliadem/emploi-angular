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
