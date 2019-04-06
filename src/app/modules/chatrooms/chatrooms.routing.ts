import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componenti
import { ChatroomsListComponent, ChatroomComponent } from './components/';

// Guards
import { UserGuardService } from '../../services';

const routes: Routes = [
  {
    path: '',
    component: ChatroomsListComponent,
    canActivate: [UserGuardService]
  },
  {
    path: ':chatroomId',
    component: ChatroomComponent,
    canActivate: [UserGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatroomsRoutingModule {}
