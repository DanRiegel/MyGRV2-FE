import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// Modelli
import { RestResponse, ErrorNotification } from '../models';

// Variabili d'ambiente
import { environment } from 'app/../environments/environment';

@Injectable()
export class ErrorNotificationService {
  constructor(private httpClient: HttpClient) {}

  public SendErrorNotification(
    errorNotification: ErrorNotification
  ): Observable<RestResponse<boolean>> {
    return this.httpClient
      .post(`${environment.apiUrl}/error-notification/`, errorNotification)
      .map((res: RestResponse<boolean>) => res);
  }
}
