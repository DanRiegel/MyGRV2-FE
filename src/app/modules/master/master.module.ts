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

// Componenti
import {
  MasterCharactersListComponent,
  MasterCharacterComponent
} from './components/';

// Routing
import { MasterRoutingModule } from './master.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MasterRoutingModule,
    LayoutComponentsModule,
    RisorseUtiliModule,
    PipesModule,
    QuillModule,
    TooltipModule,
    ModalModule
  ],
  declarations: [MasterCharactersListComponent, MasterCharacterComponent]
})
export class MasterModule {}
