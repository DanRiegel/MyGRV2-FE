import { Component, OnInit } from '@angular/core';

// Servizi
import { PlayerService } from '../../../../services';

// Modelli
import { Player } from '../../../../models';

@Component({
  selector: 'app-player-data',
  templateUrl: './player-data.component.html',
  styleUrls: ['./player-data.component.sass']
})
export class PlayerDataComponent implements OnInit {
  // Dati Giocatore
  public player: Player;

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.loadCurrentPlayerData();
  }

  private loadCurrentPlayerData(): void {
    this.playerService.GetCurrentPlayer().subscribe(res => {
      if (!!res.payload) {
        this.player = res.payload;
      }
    });
  }

  public savePlayer(): void {
    this.playerService.SavePlayer(this.player).subscribe(res => {
      if (!!res.payload) {
        this.player = res.payload;
      }
    });
  }
}
