import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoaderService {
  private numeroRichieste = 0;
  private _conteggioRichieste: BehaviorSubject<number> = new BehaviorSubject<
    number
  >(this.numeroRichieste);
  public get conteggioRichieste(): Observable<number> {
    return this._conteggioRichieste.asObservable();
  }

  constructor() {}

  public incrementaConteggio(): void {
    this.numeroRichieste++;
    this._conteggioRichieste.next(this.numeroRichieste);
  }

  public decrementaConteggio(): void {
    this.numeroRichieste--;
    this._conteggioRichieste.next(this.numeroRichieste);
  }
}
