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
import { DashboardComponent, PlayerDataComponent } from './components/';

// Routing
import { MygrvRoutingModule } from './mygrv.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    QuillModule,
    TooltipModule,
    ModalModule,
    LayoutComponentsModule,
    PipesModule,
    MygrvRoutingModule
  ],
  declarations: [DashboardComponent, PlayerDataComponent]
})
export class MygrvModule {}
