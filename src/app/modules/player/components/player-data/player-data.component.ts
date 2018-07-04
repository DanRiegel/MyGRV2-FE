import { Component, OnInit } from '@angular/core';

// Servizi
import { PlayerCommonService } from '../../services/player-common.service';
import { CommonService } from '../../../../services';

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

  constructor(
    public playerCommonService: PlayerCommonService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.loadCurrentPlayerData();
  }

  private loadCurrentPlayerData(): void {
    this.commonService.GetCurrentPlayer().subscribe(res => {
      if (!!res.payload) {
        this.player = res.payload;
      }
    });
  }

  public savePlayer(): void {
    this.commonService.SavePlayer(this.player).subscribe(res => {
      if (!!res.payload) {
        this.player = res.payload;
      }
    });
  }
}
