import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

// Modelli
import { RestResponse, AppConfiguration } from '../models';

// Variabili d'ambiente
import { environment } from 'app/../environments/environment';

@Injectable()
export class AppConfigurationService {
  private currentAppConfiguration: RestResponse<AppConfiguration>;

  constructor(private httpClient: HttpClient) {}

  public getAppConfiguration(): Observable<RestResponse<AppConfiguration>> {
    if (!!this.currentAppConfiguration) {
      return Observable.of(this.currentAppConfiguration);
    }

    return this.httpClient
      .get(`${environment.apiUrl}/app-configuration/`)
      .map((res: RestResponse<AppConfiguration>) => res)
      .do(res => (this.currentAppConfiguration = res));
  }
}
