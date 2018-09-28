import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componenti
import {
  DashboardComponent,
  PlayerDataComponent,
  NotifyErrorComponent
} from './components/';

// Guards
import { UserGuardService } from '../../services';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [UserGuardService]
  },
  {
    path: 'data',
    component: PlayerDataComponent
  },
  {
    path: 'notify-error',
    component: NotifyErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MygrvRoutingModule {}
