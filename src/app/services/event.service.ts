import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

// Modelli
import {
  RestResponse,
  GameEvent,
  GameEventSubscription,
  GameEventSubscriptionCharacter
} from '../models';

// Variabili d'ambiente
import { environment } from 'app/../environments/environment';

@Injectable()
export class EventService {
  constructor(private httpClient: HttpClient) {}

  public GetNextEvents(): Observable<RestResponse<GameEvent[]>> {
    return this.httpClient
      .get(`${environment.apiUrl}/events/next/`)
      .map((res: RestResponse<GameEvent[]>) => res);
  }

  public GetEvent(eventId: number): Observable<RestResponse<GameEvent>> {
    return this.httpClient
      .get(`${environment.apiUrl}/events/${eventId}/`)
      .map((res: RestResponse<GameEvent>) => res);
  }

  public SubscribeToEvent(
    subscription: GameEventSubscription,
    subscriptionCharacters: GameEventSubscriptionCharacter[]
  ): Observable<RestResponse<boolean>> {
    return this.httpClient
      .post(`${environment.apiUrl}/event-subscription/`, {
        subscription: subscription,
        characters: subscriptionCharacters
      })
      .map((res: RestResponse<boolean>) => res);
  }
}
