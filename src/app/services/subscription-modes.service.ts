import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

// Modelli
import { RestResponse, SubscriptionMode } from '../models';

// Variabili d'ambiente
import { environment } from 'app/../environments/environment';

@Injectable()
export class SubscriptionModesService {
  constructor(private httpClient: HttpClient) {}

  public GetEventSubscriptionModes(
    eventId: number,
    selectedDays: number
  ): Observable<RestResponse<SubscriptionMode[]>> {
    return this.httpClient
      .get(
        `${
          environment.apiUrl
        }/subscription-modes/event/${eventId}/${selectedDays}/`
      )
      .map((res: RestResponse<SubscriptionMode[]>) => res);
  }
}
