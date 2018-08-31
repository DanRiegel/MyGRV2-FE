import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Moduli Esterni
import { QuillModule } from 'ngx-quill';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

// Moduli
import { LayoutComponentsModule } from '../layout-components/layout-components.module';
import { PipesModule } from '../pipes/pipes.module';

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

// Routing
import { PlayerRoutingModule } from './player.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PlayerRoutingModule,
    LayoutComponentsModule,
    PipesModule,
    QuillModule,
    TooltipModule,
    ModalModule
  ],
  declarations: [
    CharactersListComponent,
    CharacterComponent,
    EventsListComponent,
    EventSubscriptionComponent,
    EventSubscriptionSuccessComponent
  ],
  providers: [PlayerCommonService]
})
export class PlayerModule {}
