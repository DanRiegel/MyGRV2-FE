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

  public GetAllEvents(): Observable<RestResponse<GameEvent[]>> {
    return this.httpClient
      .get(`${environment.apiUrl}/events/`)
      .map((res: RestResponse<GameEvent[]>) => res);
  }

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

  public GetUserSubscriptions(): Observable<
    RestResponse<GameEventSubscriptionDTO[]>
  > {
    return this.httpClient
      .get(`${environment.apiUrl}/event-subscription/`)
      .map((res: RestResponse<GameEventSubscriptionDTO[]>) => res);
  }

  public GetEventSubscriptions(
    eventId: number
  ): Observable<RestResponse<GameEventSubscriptionDTO[]>> {
    return this.httpClient
      .get(`${environment.apiUrl}/event-subscription/by-event/${eventId}/`)
      .map((res: RestResponse<GameEventSubscriptionDTO[]>) => res);
  }

  public SetSubscriptionAsPaid(
    subscriptionId: number
  ): Observable<RestResponse<boolean>> {
    return this.httpClient
      .put(
        `${environment.apiUrl}/event-subscription/set-paid/${subscriptionId}/`,
        {}
      )
      .map((res: RestResponse<boolean>) => res);
  }

  public SetSubscriptionAsUnpaid(
    subscriptionId: number
  ): Observable<RestResponse<boolean>> {
    return this.httpClient
      .put(
        `${
          environment.apiUrl
        }/event-subscription/set-unpaid/${subscriptionId}/`,
        {}
      )
      .map((res: RestResponse<boolean>) => res);
  }

  public RemoveSubscription(
    subscriptionId: number
  ): Observable<RestResponse<boolean>> {
    return this.httpClient
      .delete(`${environment.apiUrl}/event-subscription/${subscriptionId}/`)
      .map((res: RestResponse<boolean>) => res);
  }
}
