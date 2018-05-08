import { Injectable } from '@angular/core';

// Models
import { MenuEntry } from '../models/menu-entry.model';

@Injectable()
export class MenuService {
  public entries: MenuEntry[] = [];

  constructor() {}
}
