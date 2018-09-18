import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Moduli Esterni
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// Moduli
import { LayoutComponentsModule } from './modules/layout-components/layout-components.module';

// Componenti
import { AppComponent } from './app.component';
import {
  LandingComponent,
  LoginComponent,
  SkillDetailComponent,
  ConfirmModalComponent
} from './components/';

// Servizi
import {
  CommonService,
  GuardService,
  UserGuardService,
  HttpInterceptorService,
  LoaderService,
  MenuService,
  UserService,
  PlayerService,
  CharacterService,
  EventService,
  SubscriptionModesService,
  PaymentMethodsService
} from './services/';

// Routing
import { AppRoutingModule } from './app.routing';

// Costanti
import * as CONST from './constants';

// Ambiente
import { environment } from '../environments/environment';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    LayoutComponentsModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    SkillDetailComponent,
    ConfirmModalComponent,
    LogoutComponent
  ],
  providers: [
    CommonService,
    GuardService,
    UserGuardService,
    LoaderService,
    MenuService,
    UserService,
    PlayerService,
    CharacterService,
    EventService,
    SubscriptionModesService,
    PaymentMethodsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  entryComponents: [SkillDetailComponent, ConfirmModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
