import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { JwtHelperService } from '@auth0/angular-jwt';

// Modelli
import { RestResponse, User } from '../models';

// Costanti
import * as CONSTANTS from '../constants';

// Variabili d'ambiente
import { environment } from 'app/../environments/environment';

@Injectable()
export class UserService {
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
  }
  public set LoggedUserToken(value: string) {
    this._LoggedUserToken = value;

    if (!value) {
      localStorage.removeItem(CONSTANTS.LOCALSTORAGE_USER_KEY);
      return;
    }

    localStorage.setItem(CONSTANTS.LOCALSTORAGE_USER_KEY, value);
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
      role: +userData.role
    };
  }

  public GetUserRole(): string {
    const userData = this.getUserData();

    if (!userData) {
      return null;
    }

    switch (userData.role) {
      case CONSTANTS.ROLE_MASTER_CODE:
        return CONSTANTS.ROLE_MASTER;
      case CONSTANTS.ROLE_PLAYER_CODE:
        return CONSTANTS.ROLE_PLAYER;
      default:
        return null;
    }
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
