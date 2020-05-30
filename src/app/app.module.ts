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
  ConfirmModalComponent,
  LogoutComponent,
  MessagingComponent,
  NewMessageComponent,
  EditNoteModalComponent
} from './components/';

// Servizi
import {
  AppConfigurationService,
  CommonService,
  GuardService,
  UserGuardService,
  HttpInterceptorService,
  InventoryService,
  LoaderService,
  MenuService,
  UserService,
  PlayerService,
  CharacterService,
  EventService,
  SubscriptionModesService,
  PaymentMethodsService,
  ErrorNotificationService,
  MessagingService
} from './services/';

// Routing
import { AppRoutingModule } from './app.routing';

// Costanti
import * as CONST from './constants';

// Ambiente
import { environment } from '../environments/environment';

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
    LogoutComponent,
    MessagingComponent,
    NewMessageComponent,
    EditNoteModalComponent
  ],
  providers: [
    AppConfigurationService,
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
    ErrorNotificationService,
    MessagingService,
    InventoryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  entryComponents: [
    SkillDetailComponent,
    ConfirmModalComponent,
    NewMessageComponent,
    EditNoteModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
