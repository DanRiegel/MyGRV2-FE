import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

// Modelli
import { RestResponse, Chatroom } from 'app/models';

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
}
