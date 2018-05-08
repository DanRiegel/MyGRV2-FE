import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Componenti
import {
  ContainerPageComponent,
  HeaderComponent,
  FooterComponent
} from './components/';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [ContainerPageComponent, HeaderComponent, FooterComponent],
  declarations: [ContainerPageComponent, HeaderComponent, FooterComponent]
})
export class LayoutComponentsModule {}
