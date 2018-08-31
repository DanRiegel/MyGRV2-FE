import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componenti
import {
  MasterCharactersListComponent,
  MasterCharacterComponent
} from './components/';

// Guards
import { UserGuardService } from '../../services';

const routes: Routes = [
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  {
    path: 'characters',
    component: MasterCharactersListComponent,
    canActivate: [UserGuardService]
  },
  {
    path: 'characters/:characterId',
    component: MasterCharacterComponent,
    canActivate: [UserGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule {}
