import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componenti
import {
  AccountantCharactersListComponent,
  AccountantCharacterComponent,
  AccountantEventSubscriptionComponent,
  AccountantEventSubscriptionSuccessComponent,
  AccountantPlayerComponent,
  AccountantPlayersListComponent,
  AccountantEventsListComponent
} from './components/';

// Guards
import { UserGuardService } from '../../services';

const routes: Routes = [
  { path: '', redirectTo: 'players', pathMatch: 'full' },
  {
    path: 'players',
    component: AccountantPlayersListComponent,
    canActivate: [UserGuardService]
  },
  {
    path: 'players/:playerId',
    component: AccountantPlayerComponent,
    canActivate: [UserGuardService]
  },
  {
    path: 'characters',
    component: AccountantCharactersListComponent,
    canActivate: [UserGuardService]
  },
  {
    path: 'characters/:characterId',
    component: AccountantCharacterComponent,
    canActivate: [UserGuardService]
  },
  {
    path: 'events',
    component: AccountantEventsListComponent,
    canActivate: [UserGuardService]
  },
  {
    path: 'events/:eventId/subscription',
    component: AccountantEventSubscriptionComponent,
    canActivate: [UserGuardService]
  },
  {
    path: 'events/:eventId/subscription/success/:subscriptionId',
    component: AccountantEventSubscriptionSuccessComponent,
    canActivate: [UserGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountantRoutingModule {}
