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

  public CanCreateCharacters(): Observable<RestResponse<boolean>> {
    return this.httpClient
      .get(`${environment.apiUrl}/characters/can-create/`)
      .map((res: RestResponse<boolean>) => res);
  }

  public GetCharacters(): Observable<RestResponse<CharacterDTO[]>> {
    return this.httpClient
      .get(`${environment.apiUrl}/characters/`)
      .map((res: RestResponse<CharacterDTO[]>) => res);
  }

  public GetPlayerCharacters(
    playerId: number
  ): Observable<RestResponse<CharacterDTO[]>> {
    return this.httpClient
      .get(`${environment.apiUrl}/characters/by-player/${playerId}/`)
      .map((res: RestResponse<CharacterDTO[]>) => res);
  }

  public GetAllCharacters(): Observable<RestResponse<CharacterDTO[]>> {
    return this.httpClient
      .get(`${environment.apiUrl}/characters/all/`)
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

  public ApproveCharacterBackground(
    characterId: number
  ): Observable<RestResponse<Character>> {
    return this.httpClient
      .put(`${environment.apiUrl}/characters/${characterId}/approvebg/`, {})
      .map((res: RestResponse<Character>) => res);
  }

  public ApproveCharacter(
    characterId: number
  ): Observable<RestResponse<Character>> {
    return this.httpClient
      .put(`${environment.apiUrl}/characters/${characterId}/approvepg/`, {})
      .map((res: RestResponse<Character>) => res);
  }

  public ApproveSkills(
    characterId: number
  ): Observable<RestResponse<Character>> {
    return this.httpClient
      .put(`${environment.apiUrl}/characters/${characterId}/approveskills/`, {})
      .map((res: RestResponse<Character>) => res);
  }

  public RejectCharacterBackground(
    characterId: number
  ): Observable<RestResponse<Character>> {
    return this.httpClient
      .put(`${environment.apiUrl}/characters/${characterId}/rejectbg/`, {})
      .map((res: RestResponse<Character>) => res);
  }

  public RejectCharacter(
    characterId: number
  ): Observable<RestResponse<Character>> {
    return this.httpClient
      .put(`${environment.apiUrl}/characters/${characterId}/rejectpg/`, {})
      .map((res: RestResponse<Character>) => res);
  }

  public RejectSkills(
    characterId: number
  ): Observable<RestResponse<Character>> {
    return this.httpClient
      .put(`${environment.apiUrl}/characters/${characterId}/rejectskills/`, {})
      .map((res: RestResponse<Character>) => res);
  }

  public RemovePlayedDay(
    characterId: number
  ): Observable<RestResponse<Character>> {
    return this.httpClient
      .put(`${environment.apiUrl}/characters/${characterId}/removeday/`, {})
      .map((res: RestResponse<Character>) => res);
  }

  public AddPlayedDay(
    characterId: number
  ): Observable<RestResponse<Character>> {
    return this.httpClient
      .put(`${environment.apiUrl}/characters/${characterId}/addday/`, {})
      .map((res: RestResponse<Character>) => res);
  }

  public PrintCharactersSheets(
    charactersIds: number[]
  ): Observable<RestResponse<string>> {
    return this.httpClient
      .post(`${environment.apiUrl}/characters-sheet/`, {
        charactersIds: charactersIds
      })
      .map((res: RestResponse<string>) => res);
  }
}
