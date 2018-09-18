import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componenti
import {
  LandingComponent,
  LoginComponent,
  LogoutComponent
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
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
