import { Component, OnInit } from '@angular/core';

// Moduli Esterni
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// Modelli
import { Skill } from '../../models/';

@Component({
  selector: 'app-skill-detail',
  templateUrl: './skill-detail.component.html',
  styleUrls: ['./skill-detail.component.sass']
})
export class SkillDetailComponent implements OnInit {
  public skill: Skill;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {}
}
