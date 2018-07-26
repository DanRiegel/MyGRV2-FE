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
import {
  CharactersListComponent,
  CharacterComponent,
  EventsListComponent,
  EventSubscriptionComponent,
  EventSubscriptionSuccessComponent
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
    CharactersListComponent,
    CharacterComponent,
    FilterSkillsPipe,
    EventsListComponent,
    EventSubscriptionComponent,
    EventSubscriptionSuccessComponent
  ],
  providers: [PlayerCommonService]
})
export class PlayerModule {}
