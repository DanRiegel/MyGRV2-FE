import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

// Modelli
import { RestResponse, Chatroom, ChatroomMessaggio } from 'app/models';

// Variabili d'ambiente
import { environment } from 'app/../environments/environment';

@Injectable()
export class ChatroomsService {
  constructor(private httpClient: HttpClient) {}

  public GetChatrooms(): Observable<RestResponse<Chatroom[]>> {
    return this.httpClient
      .get(`${environment.apiUrl}/chatrooms/`)
      .map((res: RestResponse<Chatroom[]>) => res);
  }

  public GetChatroom(chatroomId: number): Observable<RestResponse<Chatroom>> {
    return this.httpClient
      .get(`${environment.apiUrl}/chatrooms/${chatroomId}/`)
      .map((res: RestResponse<Chatroom>) => res);
  }

  public GetChatroomPreviousMessages(
    chatroomId: number,
    beforeDate: number
  ): Observable<RestResponse<ChatroomMessaggio[]>> {
    return this.httpClient
      .get(
        `${
          environment.apiUrl
        }/chatrooms/${chatroomId}/messages/history/${beforeDate}/`
      )
      .map((res: RestResponse<ChatroomMessaggio[]>) => res);
  }

  public GetChatroomNextMessages(
    chatroomId: number,
    afterDate: number
  ): Observable<RestResponse<ChatroomMessaggio[]>> {
    return this.httpClient
      .get(
        `${
          environment.apiUrl
        }/chatrooms/${chatroomId}/messages/next/${afterDate}/`
      )
      .map((res: RestResponse<ChatroomMessaggio[]>) => res);
  }

  public SendChatroomMessage(
    chatroomId: number,
    message: ChatroomMessaggio
  ): Observable<RestResponse<boolean>> {
    return this.httpClient
      .post(`${environment.apiUrl}/chatrooms/${chatroomId}/messages/`, message)
      .map((res: RestResponse<boolean>) => res);
  }
}
