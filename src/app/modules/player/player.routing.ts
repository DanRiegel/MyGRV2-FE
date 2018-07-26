import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componenti
import {
  CharactersListComponent,
  CharacterComponent,
  EventsListComponent,
  EventSubscriptionComponent,
  EventSubscriptionSuccessComponent
} from './components/';

// Guards
import { UserGuardService } from '../../services';

const routes: Routes = [
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  {
    path: 'characters',
    component: CharactersListComponent,
    canActivate: [UserGuardService]
  },
  {
    path: 'characters/:characterId',
    component: CharacterComponent,
    canActivate: [UserGuardService]
  },
  {
    path: 'events',
    component: EventsListComponent,
    canActivate: [UserGuardService]
  },
  {
    path: 'events/:eventId/subscription',
    component: EventSubscriptionComponent,
    canActivate: [UserGuardService]
  },
  {
    path: 'events/:eventId/subscription/success',
    component: EventSubscriptionSuccessComponent,
    canActivate: [UserGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule {}
