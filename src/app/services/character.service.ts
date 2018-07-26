import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

// Modelli
import { RestResponse, Character, CharacterDTO } from '../models';

// Variabili d'ambiente
import { environment } from 'app/../environments/environment';

@Injectable()
export class CharacterService {
  constructor(private httpClient: HttpClient) {}

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
}