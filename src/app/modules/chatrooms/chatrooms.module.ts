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

// Components
import { ChatroomComponent, ChatroomsListComponent } from './components/';

// Servizi
import { ChatroomsService } from './services/chatrooms.service';

// Routing
import { ChatroomsRoutingModule } from './chatrooms.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    QuillModule,
    TooltipModule,
    ModalModule,
    LayoutComponentsModule,
    PipesModule,
    ChatroomsRoutingModule
  ],
  providers: [ChatroomsService],
  declarations: [ChatroomsListComponent, ChatroomComponent]
})
export class ChatroomsModule {}
