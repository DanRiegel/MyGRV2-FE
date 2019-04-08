import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/finally';

// Servizi
import { UserService } from './user.service';
import { LoaderService } from './loader.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private loaderService: LoaderService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userToken = this.userService.LoggedUserToken;
    const isChatroom =
      req.url.indexOf('messages/next') > -1 ||
      req.url.indexOf('messages/history') > -1;

    if (!isChatroom) {
      this.loaderService.incrementaConteggio();
    }

    if (!userToken) {
      return next.handle(req).finally(() => {
        if (!isChatroom) {
          this.loaderService.decrementaConteggio();
        }
      });
    } else {
      const changedReq = req.clone({
        headers: req.headers.set('Authorization', userToken)
      });
      return next
        .handle(changedReq)
        .catch((err: any) => {
          if (err instanceof HttpErrorResponse) {
            this.gestioneErrori(err);
            return Observable.throw(err);
          }
        })
        .finally(() => {
          if (!isChatroom) {
            this.loaderService.decrementaConteggio();
          }
        });
    }
  }

  private gestioneErrori(err: HttpErrorResponse): void {
    if (err.status === 401 || err.status === 403) {
      localStorage.clear();
      this.router.navigateByUrl('/login');
      return;
    }
  }
}
