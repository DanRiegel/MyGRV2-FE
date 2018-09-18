import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componenti
import {
  AccountantCharactersListComponent,
  AccountantCharacterComponent,
  AccountantPlayerComponent,
  AccountantPlayersListComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountantRoutingModule {}
