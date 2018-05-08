import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

// Moduli
import { LayoutComponentsModule } from '../layout-components/layout-components.module';

// Componenti
import { PlayerComponent } from './player.component';
import {
  CharactersListComponent,
  CharacterComponent,
  PlayerDataComponent
} from './components/';

// Servizi
import { PlayerCommonService } from './services/player-common.service';

// Pipes
import { FilterSkillsPipe } from './pipes/filter-skills.pipe';

// Routing
import { PlayerRoutingModule } from './player.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PlayerRoutingModule,
    LayoutComponentsModule,
    QuillModule
  ],
  declarations: [
    PlayerComponent,
    CharactersListComponent,
    CharacterComponent,
    PlayerDataComponent,
    FilterSkillsPipe
  ],
  providers: [PlayerCommonService]
})
export class PlayerModule {}
