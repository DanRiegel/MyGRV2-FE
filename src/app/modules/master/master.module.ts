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

// Componenti
import {
  MasterCharactersListComponent,
  MasterCharacterComponent
} from './components/';

// Routing
import { MasterRoutingModule } from './master.routing';

// Pipe
import { CharacterDtoPipe } from './pipes/character-dto.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MasterRoutingModule,
    LayoutComponentsModule,
    PipesModule,
    QuillModule,
    TooltipModule,
    ModalModule
  ],
  declarations: [
    MasterCharactersListComponent,
    MasterCharacterComponent,
    CharacterDtoPipe
  ]
})
export class MasterModule {}
