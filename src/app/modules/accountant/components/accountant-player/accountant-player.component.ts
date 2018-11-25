import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Servizi
import { PlayerService } from '../../../../services';

// Modelli
import { Player } from '../../../../models';

// Utility
import { ConversionUtils } from 'app/utils/conversionUtils';

@Component({
  selector: 'app-accountant-player',
  templateUrl: './accountant-player.component.html',
  styleUrls: ['./accountant-player.component.sass']
})
export class AccountantPlayerComponent implements OnInit {
  // Dati Giocatore
  public player: Player;

  // Date d'appoggio
  public dataScaricoResponsabilita: Date;
  public dataQuotaAssociativa: Date;

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('playerId')) {
        const playerId = +params.get('playerId');

        this.loadPlayerData(playerId);
      }
    });
  }

  private loadPlayerData(playerId: number): void {
    this.playerService.GetPlayer(playerId).subscribe(res => {
      if (!!res.payload) {
        this.player = res.payload;
        this.dataScaricoResponsabilita = new Date(
          this.player.dataScaricoResponsabilita
        );
        this.dataQuotaAssociativa = new Date(this.player.dataQuotaAssociativa);
      }
    });
  }

  public savePlayer(): void {
    if (this.dataScaricoResponsabilita) {
      this.player.dataScaricoResponsabilita = ConversionUtils.dateToString(
        this.dataScaricoResponsabilita
      );
    }
    if (this.dataQuotaAssociativa) {
      this.player.dataQuotaAssociativa = ConversionUtils.dateToString(
        this.dataQuotaAssociativa
      );
    }
    this.playerService.SavePlayer(this.player).subscribe(res => {
      if (!!res.payload) {
        this.player = res.payload;
      }
    });
  }

  public goToList(): void {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }
}
