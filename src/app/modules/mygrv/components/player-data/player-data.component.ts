import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  public isFirstAccess = false;

  constructor(
    private playerService: PlayerService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(params => {
      this.isFirstAccess = !!params.firstAccess;
    });

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
