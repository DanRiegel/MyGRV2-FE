import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Servizi
import { PlayerService } from '../../../../services';

// Modelli
import { Player } from '../../../../models';

@Component({
  selector: 'app-accountant-players-list',
  templateUrl: './accountant-players-list.component.html',
  styleUrls: ['./accountant-players-list.component.sass']
})
export class AccountantPlayersListComponent implements OnInit {
  public playersList: Player[] = [];
  public filters: Player = new Player();

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadPlayers();
  }

  private loadPlayers(): void {
    this.playerService.GetPlayers().subscribe(res => {
      if (!res.payload) {
        return;
      }

      this.playersList = res.payload;
    });
  }

  public openPlayer(playerId: number): void {
    this.router.navigate([playerId], { relativeTo: this.activatedRoute });
  }
}
