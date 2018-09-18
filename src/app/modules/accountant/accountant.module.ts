import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Moduli
import { LayoutComponentsModule } from '../layout-components/layout-components.module';
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
  AccountantPlayerComponent,
  AccountantPlayersListComponent
} from './components/';

// Routing
import { AccountantRoutingModule } from './accountant.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AccountantRoutingModule,
    LayoutComponentsModule,
    PipesModule,
    QuillModule,
    TooltipModule,
    ModalModule,
    BsDatepickerModule
  ],
  declarations: [
    AccountantCharactersListComponent,
    AccountantCharacterComponent,
    AccountantPlayerComponent,
    AccountantPlayersListComponent
  ]
})
export class AccountantModule {}
