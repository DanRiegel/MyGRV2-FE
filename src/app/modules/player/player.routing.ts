import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componenti
import { PlayerComponent } from './player.component';
import {
  CharactersListComponent,
  CharacterComponent,
  PlayerDataComponent
} from './components/';

// Guards
import { UserGuardService } from '../../services';

const routes: Routes = [
  { path: '', component: PlayerComponent, canActivate: [UserGuardService] },
  { path: 'data', component: PlayerDataComponent },
  {
    path: 'characters',
    component: CharactersListComponent,
    canActivate: [UserGuardService]
  },
  {
    path: 'characters/:characterId',
    component: CharacterComponent,
    canActivate: [UserGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule {}
