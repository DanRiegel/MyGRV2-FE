import { Component, OnInit } from '@angular/core';

// Moduli Esterni
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-edit-note-modal',
  templateUrl: './edit-note-modal.component.html',
  styleUrls: ['./edit-note-modal.component.sass']
})
export class EditNoteModalComponent implements OnInit {
  public set noteText(value: string) {
    this.newNoteText = JSON.parse(JSON.stringify(value));
  }

  public newNoteText: string;
  public result = false;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {}

  public saveNotes(): void {
    this.result = true;
    this.bsModalRef.hide();
  }
}
