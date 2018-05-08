import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componenti
import { PlayerComponent } from './player.component';
import {
  CharactersListComponent,
  CharacterComponent,
  PlayerDataComponent
} from './components/';

const routes: Routes = [
  { path: '', component: PlayerComponent },
  { path: 'data', component: PlayerDataComponent },
  { path: 'characters', component: CharactersListComponent },
  { path: 'characters/:characterId', component: CharacterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule {}
