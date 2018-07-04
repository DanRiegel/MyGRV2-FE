import { Injectable } from '@angular/core';

// Models
import { MenuEntry } from '../../../models/menu-entry.model';

@Injectable()
export class PlayerCommonService {
  public menuEntries: MenuEntry[] = [
    <MenuEntry>{ label: 'Riepilogo', route: '/player' },
    <MenuEntry>{ label: 'I tuoi dati', route: '/player/data' },
    <MenuEntry>{ label: 'Personaggi', route: '/player/characters' },
    <MenuEntry>{ label: 'Iscrizioni LIVE', route: '/player/lives' },
    <MenuEntry>{ label: 'Comunicazioni', route: '/player/notifications' },
    <MenuEntry>{ label: 'Logout', route: '/logout' }
  ];

  constructor() {}
}
