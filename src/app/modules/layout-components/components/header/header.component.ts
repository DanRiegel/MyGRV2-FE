import { Component, OnInit, Input } from '@angular/core';

// Servizi
import { MenuService } from '../../../../services/menu.service';

// Models
import { MenuEntry } from '../../../../models/';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  public expanded = false;
  @Input() menuEntries: MenuEntry[] = [];

  constructor(public menuService: MenuService) {}

  ngOnInit() {}
}
