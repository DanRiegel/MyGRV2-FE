import { Component, OnInit } from '@angular/core';

// Moduli Esterni
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.sass']
})
export class ConfirmModalComponent implements OnInit {
  public title = 'Conferma operazione';
  public content = `Confermare l'esecuzione dell'operazione`;
  public closebutton = 'Annulla';
  public okbutton = 'Conferma';

  public result = false;

  constructor(public bsModalRef: BsModalRef) {
    this.result = false;
  }

  ngOnInit() {
    this.result = false;
  }

  public confirmAndClose(): void {
    this.result = true;
    this.bsModalRef.hide();
  }
}
