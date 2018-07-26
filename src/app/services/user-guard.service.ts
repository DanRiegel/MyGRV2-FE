import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Servizi
import { PlayerService } from './player.service';
import { UserService } from './user.service';
import { Player, RestResponse } from '../models';

@Injectable()
export class UserGuardService implements CanActivate {
  constructor(
    private playerService: PlayerService,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (!!this.userService.PlayerData) {
      const giocatoreValido = this.giocatoreHaDatiObbligatori(
        this.userService.PlayerData
      );

      if (!giocatoreValido) {
        this.router.navigateByUrl('/mygrv/data');
      }

      return giocatoreValido;
    }

    return this.playerService
      .GetCurrentPlayer()
      .map((res: RestResponse<Player>) => {
        this.userService.PlayerData = res.payload;
        const giocatoreValido =
          res && res.payload && this.giocatoreHaDatiObbligatori(res.payload);

        if (!giocatoreValido) {
          this.router.navigateByUrl('/mygrv/data');
        }

        return giocatoreValido;
      });
  }

  private giocatoreHaDatiObbligatori(datiGiocatore: Player): boolean {
    if (!datiGiocatore) {
      return false;
    }

    if (
      !datiGiocatore.nome ||
      (!!datiGiocatore.nome && datiGiocatore.nome.trim() === '')
    ) {
      return false;
    }

    if (
      !datiGiocatore.cognome ||
      (!!datiGiocatore.cognome && datiGiocatore.cognome.trim() === '')
    ) {
      return false;
    }

    return true;
  }
}
