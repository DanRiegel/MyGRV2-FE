import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Moduli
import { LayoutComponentsModule } from '../layout-components/layout-components.module';
import { RisorseUtiliModule } from '../../components/risorse-utili/risorse-utili.module';
import { PipesModule } from '../pipes/pipes.module';

// Moduli Esterni
import { QuillModule } from 'ngx-quill';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

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

// Routing
import { AccountantRoutingModule } from './accountant.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AccountantRoutingModule,
    LayoutComponentsModule,
    RisorseUtiliModule,
    PipesModule,
    QuillModule,
    TooltipModule,
    ModalModule,
    BsDatepickerModule
  ],
  declarations: [
    AccountantCharactersListComponent,
    AccountantCharacterComponent,
    AccountantEventSubscriptionComponent,
    AccountantEventSubscriptionSuccessComponent,
    AccountantPlayerComponent,
    AccountantPlayersListComponent,
    AccountantEventsListComponent
  ]
})
export class AccountantModule {}
