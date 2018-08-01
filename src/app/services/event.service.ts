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
  GameEventSubscriptionCharacter,
  GameEventSubscriptionDTO
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
  ): Observable<RestResponse<number>> {
    return this.httpClient
      .post(`${environment.apiUrl}/event-subscription/`, {
        subscription: subscription,
        characters: subscriptionCharacters
      })
      .map((res: RestResponse<number>) => res);
  }

  public GetSubscription(
    subscriptionId: number
  ): Observable<RestResponse<GameEventSubscriptionDTO>> {
    return this.httpClient
      .get(`${environment.apiUrl}/event-subscription/${subscriptionId}/`)
      .map((res: RestResponse<GameEventSubscriptionDTO>) => res);
  }
}
