import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Moduli Esterni
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

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
  HttpInterceptorService,
  LoaderService,
  MenuService,
  UserService
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
    ModalModule.forRoot()
  ],
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    SkillDetailComponent,
    ConfirmModalComponent
  ],
  providers: [
    CommonService,
    GuardService,
    LoaderService,
    MenuService,
    UserService,
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
