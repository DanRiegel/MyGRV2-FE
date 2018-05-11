import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Moduli Esterni
import { QuillModule } from 'ngx-quill';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

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
    QuillModule,
    TooltipModule,
    ModalModule
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
