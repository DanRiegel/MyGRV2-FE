import { Component, OnInit } from '@angular/core';

// Modelli
import { Communication, Player, CharacterDTO } from '../../models/';

// Moduli Esterni
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// Servizi
import { PlayerService, CharacterService } from '../../services';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.sass']
})
export class NewMessageComponent implements OnInit {
  public newMessage: Communication;

  public playersList: Player[] = [];
  public charactersList: CharacterDTO[] = [];

  constructor(
    private playerService: PlayerService,
    private characterService: CharacterService,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit() {
    this.newMessage = new Communication();
  }

  public mostraTestoMessaggio(): boolean {
    switch (this.newMessage.gruppodestinatario) {
      case 'PLAYER':
        return !!this.newMessage.idgiocatoredestinatario;
      case 'CHARACTER':
        return (
          !!this.newMessage.idgiocatoredestinatario &&
          !!this.newMessage.idpersonaggiodestinatario
        );
      case 'PNG':
        return !!this.newMessage.nomepng;
      case 'ACCOUNTANT':
      case 'MASTER':
        return true;
      default:
        return false;
    }
  }

  public groupChanged(group: string): void {
    this.newMessage.idgiocatoredestinatario = null;
    this.newMessage.idpersonaggiodestinatario = null;
    this.newMessage.nomepng = null;

    switch (group) {
      case 'PLAYER':
      case 'CHARACTER':
        if (this.playersList && this.playersList.length > 0) {
          return;
        }

        this.playerService.GetPlayers().subscribe(res => {
          this.playersList = res.payload;
        });
        break;
    }
  }

  public playerChanged(playerId: number): void {
    if (this.newMessage.gruppodestinatario !== 'CHARACTER') {
      return;
    }

    this.characterService.GetPlayerCharacters(playerId).subscribe(res => {
      this.charactersList = res.payload;
    });
  }
}
