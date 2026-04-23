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
