import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Moduli
import { LayoutComponentsModule } from '../layout-components/layout-components.module';

// Componenti
import { MasterComponent } from './master.component';

// Routing
import { MasterRoutingModule } from './master.routing';

@NgModule({
  imports: [CommonModule, MasterRoutingModule, LayoutComponentsModule],
  declarations: [MasterComponent]
})
export class MasterModule {}
