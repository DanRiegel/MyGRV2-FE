import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

// Servizi
import { UserService } from './user.service';

// Modelli
import { RestResponse, KeyValue, Skill, MenuEntry } from '../models';

// Variabili d'ambiente
import { environment } from 'app/../environments/environment';

@Injectable()
export class CommonService {
  public dashboardEntry = <MenuEntry>{
    label: 'Riepilogo',
    route: '/mygrv/dashboard'
  };
  public playerDataEntry = <MenuEntry>{
    label: 'I tuoi dati',
    route: '/mygrv/data'
  };

  public playerEntries: MenuEntry[] = [
    <MenuEntry>{
      label: 'Giocatore',
      subEntries: [
        <MenuEntry>{ label: 'I tuoi personaggi', route: '/player/characters' },
        <MenuEntry>{ label: 'Iscrizione eventi', route: '/player/events' }
      ]
    }
  ];

  public masterEntries: MenuEntry[] = [
    <MenuEntry>{
      label: 'Master',
      subEntries: [
        <MenuEntry>{ label: 'Gestione personaggi', route: '/master/characters' }
      ]
    }
  ];

  public messagesEntry = <MenuEntry>{
    label: 'Comunicazioni',
    route: '/player/notifications'
  };
  public logoutEntry = <MenuEntry>{ label: 'Logout', route: '/logout' };

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  /**
   * GENERAL
   */
  public getActiveMenuEntries(): MenuEntry[] {
    let entries: MenuEntry[] = [this.dashboardEntry, this.playerDataEntry];

    // Check giocatore
    const playerData = this.userService.PlayerData;
    if (playerData.giocatore) {
      entries = entries.concat(this.playerEntries);
    }

    // Check master
    if (playerData.master) {
      entries = entries.concat(this.masterEntries);
    }

    entries.push(this.messagesEntry);
    entries.push(this.logoutEntry);
    return entries;
  }

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
