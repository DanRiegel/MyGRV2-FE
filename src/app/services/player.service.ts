import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

// Servizi
import { UserService } from './user.service';

// Modelli
import { RestResponse, Player } from '../models';

// Variabili d'ambiente
import { environment } from 'app/../environments/environment';

@Injectable()
export class PlayerService {
  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  public GetPlayers(): Observable<RestResponse<Player[]>> {
    return this.httpClient
      .get(`${environment.apiUrl}/players/`)
      .map((res: RestResponse<Player[]>) => res);
  }

  public GetCurrentPlayer(): Observable<RestResponse<Player>> {
    return this.httpClient
      .get(`${environment.apiUrl}/players/current/`)
      .map((res: RestResponse<Player>) => res);
  }

  public GetPlayer(playerId: number): Observable<RestResponse<Player>> {
    return this.httpClient
      .get(`${environment.apiUrl}/players/${playerId}/`)
      .map((res: RestResponse<Player>) => res);
  }

  public SavePlayer(player: Player): Observable<RestResponse<Player>> {
    return this.httpClient
      .post(`${environment.apiUrl}/players/`, player)
      .map((res: RestResponse<Player>) => res)
      .do((res: RestResponse<Player>) => (this.userService.PlayerData = null));
  }
}
