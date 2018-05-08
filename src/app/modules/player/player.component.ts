import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Servizi
import { PlayerCommonService } from './services/player-common.service';
import { CommonService } from '../../services';

// Modelli
import { Character } from '../../models';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent implements OnInit {
  public playerCharacters: Character[] = [];

  constructor(
    public playerCommonService: PlayerCommonService,
    private commonService: CommonService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getPlayerCharacters();
  }

  private getPlayerCharacters(): void {
    this.commonService.GetCharacters().subscribe(res => {
      if (!!res.payload) {
        this.playerCharacters = res.payload;
      }
    });
  }

  public openCharactersList(): void {
    this.router.navigate(['characters'], { relativeTo: this.activatedRoute });
  }
}
