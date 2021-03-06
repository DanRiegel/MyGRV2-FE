import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componenti
import {
  LandingComponent,
  LoginComponent,
  LogoutComponent,
  MessagingComponent
} from './components/';

// Servizi
import { GuardService } from './services/guard.service';

const routes: Routes = [
  { path: '', component: LandingComponent, canActivate: [GuardService] },
  {
    path: 'mygrv',
    loadChildren: './modules/mygrv/mygrv.module#MygrvModule',
    canActivate: [GuardService]
  },
  {
    path: 'player',
    loadChildren: './modules/player/player.module#PlayerModule',
    canActivate: [GuardService]
  },
  {
    path: 'master',
    loadChildren: './modules/master/master.module#MasterModule',
    canActivate: [GuardService]
  },
  {
    path: 'accountant',
    loadChildren: './modules/accountant/accountant.module#AccountantModule',
    canActivate: [GuardService]
  },
  {
    path: 'chatrooms',
    loadChildren: './modules/chatrooms/chatrooms.module#ChatroomsModule',
    canActivate: [GuardService]
  },
  { path: 'messaging', component: MessagingComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'relogin',
    component: LoginComponent,
    data: { preventAutoLogin: true }
  },
  { path: 'logout', component: LogoutComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
