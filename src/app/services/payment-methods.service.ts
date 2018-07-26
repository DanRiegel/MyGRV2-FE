import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

// Modelli
import { RestResponse, PaymentMethod } from '../models';

// Variabili d'ambiente
import { environment } from 'app/../environments/environment';

@Injectable()
export class PaymentMethodsService {
  constructor(private httpClient: HttpClient) {}

  public GetPaymentMethods(): Observable<RestResponse<PaymentMethod[]>> {
    return this.httpClient
      .get(`${environment.apiUrl}/payment-methods/`)
      .map((res: RestResponse<PaymentMethod[]>) => res);
  }
}
