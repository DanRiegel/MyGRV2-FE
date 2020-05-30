import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

// Modelli
import { RestResponse, InventoryItem } from '../models';

// Variabili d'ambiente
import { environment } from 'app/../environments/environment';

@Injectable()
export class InventoryService {
  constructor(private httpClient: HttpClient) {}

  public GetCharacterInventory(
    characterId: number
  ): Observable<RestResponse<InventoryItem[]>> {
    return this.httpClient.get<RestResponse<InventoryItem[]>>(
      `${environment.apiUrl}/inventory/by-character/${characterId}/`
    );
  }

  public SaveInventoryItem(
    item: InventoryItem
  ): Observable<RestResponse<InventoryItem>> {
    return this.httpClient.post<RestResponse<InventoryItem>>(
      `${environment.apiUrl}/inventory/`,
      item
    );
  }

  public DeleteInventoryItem(
    itemId: number
  ): Observable<RestResponse<boolean>> {
    return this.httpClient.delete<RestResponse<boolean>>(
      `${environment.apiUrl}/inventory/${itemId}/`
    );
  }
}
