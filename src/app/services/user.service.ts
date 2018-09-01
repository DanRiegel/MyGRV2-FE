import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { JwtHelperService } from '@auth0/angular-jwt';

// Modelli
import { RestResponse, User, Player } from '../models';

// Costanti
import * as CONSTANTS from '../constants';

// Variabili d'ambiente
import { environment } from 'app/../environments/environment';

@Injectable()
export class UserService {
  /** Token accesso */
  private _LoggedUserToken: string;
  public get LoggedUserToken(): string {
    if (!!this._LoggedUserToken) {
      return this._LoggedUserToken;
    }

    const userData = localStorage.getItem(CONSTANTS.LOCALSTORAGE_USER_KEY);

    if (!!userData) {
      this._LoggedUserToken = userData;
      return this._LoggedUserToken;
    }

    return null;
  }
  public set LoggedUserToken(value: string) {
    this._LoggedUserToken = value;

    if (!value) {
      localStorage.removeItem(CONSTANTS.LOCALSTORAGE_USER_KEY);
      return;
    }

    localStorage.setItem(CONSTANTS.LOCALSTORAGE_USER_KEY, value);
  }

  /** Dati utente */
  private _PlayerData: Player;
  public get PlayerData(): Player {
    if (!!this._PlayerData) {
      return this._PlayerData;
    }

    const playerData = localStorage.getItem(
      CONSTANTS.LOCALSTORAGE_PLAYERDATA_KEY
    );

    if (!!playerData) {
      this._PlayerData = JSON.parse(playerData);
      return this._PlayerData;
    }

    return null;
  }
  public set PlayerData(value: Player) {
    this._PlayerData = value;

    if (!value) {
      localStorage.removeItem(CONSTANTS.LOCALSTORAGE_PLAYERDATA_KEY);
      return;
    }

    localStorage.setItem(
      CONSTANTS.LOCALSTORAGE_PLAYERDATA_KEY,
      JSON.stringify(value)
    );
  }

  constructor(private httpClient: HttpClient) {}

  public getUserData(): User {
    const userToken = this.LoggedUserToken;

    if (!userToken) {
      return null;
    }

    const helper = new JwtHelperService();
    const userData = helper.decodeToken(userToken);

    return <User>{
      id: +userData.userid,
      name: userData.nickname,
      role: userData.role
    };
  }

  public HasRole(roleCod: string): boolean {
    const userData = this.getUserData();
    return userData && userData.role && userData.role.indexOf(roleCod) > -1;
  }

  public Login(
    username: string,
    password: string
  ): Observable<RestResponse<string>> {
    return this.httpClient
      .post(`${environment.apiUrl}/login/`, {
        username: username,
        password: password
      })
      .map((res: RestResponse<string>) => res);
  }
}
