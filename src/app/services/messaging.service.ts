import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

// Modelli
import { RestResponse, Communication } from '../models';

// Variabili d'ambiente
import { environment } from 'app/../environments/environment';

@Injectable()
export class MessagingService {
  constructor(private httpClient: HttpClient) {}

  public GetMessages(): Observable<RestResponse<Communication[]>> {
    return this.httpClient
      .get(`${environment.apiUrl}/communications/`)
      .map((res: RestResponse<Communication[]>) => res);
  }

  public SendMessage(
    message: Communication
  ): Observable<RestResponse<Communication>> {
    return this.httpClient
      .post(`${environment.apiUrl}/communications/`, message)
      .map((res: RestResponse<Communication>) => res);
  }
}
