import { Component, OnInit, Input } from '@angular/core';

// Models
import { CommonService } from '../../../../services';

@Component({
  selector: 'app-container-page',
  templateUrl: './container-page.component.html',
  styleUrls: ['./container-page.component.sass']
})
export class ContainerPageComponent implements OnInit {
  constructor(public commonService: CommonService) {}

  ngOnInit() {}
}
