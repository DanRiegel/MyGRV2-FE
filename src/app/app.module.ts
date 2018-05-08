import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Moduli
import { LayoutComponentsModule } from './modules/layout-components/layout-components.module';

// Componenti
import { AppComponent } from './app.component';
import { LandingComponent, LoginComponent } from './components/';

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
    LayoutComponentsModule
  ],
  declarations: [AppComponent, LandingComponent, LoginComponent],
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
  bootstrap: [AppComponent]
})
export class AppModule {}
