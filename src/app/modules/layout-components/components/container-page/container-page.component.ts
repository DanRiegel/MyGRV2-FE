import { Component, OnInit, Input } from '@angular/core';

// Models
import { MenuEntry } from '../../../../models/';

@Component({
  selector: 'app-container-page',
  templateUrl: './container-page.component.html',
  styleUrls: ['./container-page.component.sass']
})
export class ContainerPageComponent implements OnInit {
  @Input() menuEntries: MenuEntry[] = [];

  constructor() {}

  ngOnInit() {}
}
