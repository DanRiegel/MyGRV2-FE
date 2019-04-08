import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Servizi
import { UserService } from './user.service';

@Injectable()
export class GuardService implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.userService.LoggedUserToken) {
      this.router.navigate(['/login'], {
        queryParams: { redir: state.url }
      });
      return false;
    }

    return true;
  }
}
