import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

// Servizi
import { UserService } from './user.service';

// Modelli
import {
  RestResponse,
  Character,
  CharacterDTO,
  KeyValue,
  Skill,
  Player
} from '../models';

// Variabili d'ambiente
import { environment } from 'app/../environments/environment';

@Injectable()
export class CommonService {
  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  /**
   * PLAYER
   */

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

  /**
   * CHARACTER
   */

  public GetCharacters(): Observable<RestResponse<CharacterDTO[]>> {
    return this.httpClient
      .get(`${environment.apiUrl}/characters/`)
      .map((res: RestResponse<CharacterDTO[]>) => res);
  }

  public GetCharacter(
    characterId: number
  ): Observable<RestResponse<Character>> {
    return this.httpClient
      .get(`${environment.apiUrl}/characters/${characterId}/`)
      .map((res: RestResponse<Character>) => res);
  }

  public SaveCharacter(
    character: Character
  ): Observable<RestResponse<Character>> {
    return this.httpClient
      .post(`${environment.apiUrl}/characters/`, character)
      .map((res: RestResponse<Character>) => res);
  }

  public RequestCharacterBackgroundApprovation(
    characterId: number
  ): Observable<RestResponse<Character>> {
    return this.httpClient
      .put(`${environment.apiUrl}/characters/${characterId}/bg/`, {})
      .map((res: RestResponse<Character>) => res);
  }

  public RequestCharacterApprovation(
    characterId: number
  ): Observable<RestResponse<Character>> {
    return this.httpClient
      .put(`${environment.apiUrl}/characters/${characterId}/pg/`, {})
      .map((res: RestResponse<Character>) => res);
  }

  public RequestSkillsApprovation(
    characterId: number
  ): Observable<RestResponse<Character>> {
    return this.httpClient
      .put(`${environment.apiUrl}/characters/${characterId}/skills/`, {})
      .map((res: RestResponse<Character>) => res);
  }

  /**
   * TABLES
   */

  public getRaces(): Observable<RestResponse<KeyValue[]>> {
    return this.httpClient
      .get(`${environment.apiUrl}/tables/races/`)
      .map((res: RestResponse<KeyValue[]>) => res);
  }

  public getDivinities(): Observable<RestResponse<KeyValue[]>> {
    return this.httpClient
      .get(`${environment.apiUrl}/tables/divinities/`)
      .map((res: RestResponse<KeyValue[]>) => res);
  }

  public getIndoles(): Observable<RestResponse<KeyValue[]>> {
    return this.httpClient
      .get(`${environment.apiUrl}/tables/indoles/`)
      .map((res: RestResponse<KeyValue[]>) => res);
  }

  public getOrigins(): Observable<RestResponse<KeyValue[]>> {
    return this.httpClient
      .get(`${environment.apiUrl}/tables/origins/`)
      .map((res: RestResponse<KeyValue[]>) => res);
  }

  public getFocuses(): Observable<RestResponse<KeyValue[]>> {
    return this.httpClient
      .get(`${environment.apiUrl}/tables/focuses/`)
      .map((res: RestResponse<KeyValue[]>) => res);
  }

  /**
   * SKILLS
   */

  public getSkills(
    selectedSkillsIds: number[] = null
  ): Observable<RestResponse<Skill[]>> {
    let params: HttpParams = new HttpParams();
    if (!!selectedSkillsIds && selectedSkillsIds.length > 0) {
      let strIds = '';
      let strSep = '';
      selectedSkillsIds.forEach(skill => {
        strIds += strSep + skill.toString();
        strSep = ',';
      });
      params = params.append('selectedSkills', strIds);
    }

    return this.httpClient
      .get(`${environment.apiUrl}/skills/`, { params: params })
      .map((res: RestResponse<Skill[]>) => res);
  }
}
