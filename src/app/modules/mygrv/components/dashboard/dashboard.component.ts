import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Servizi
import { CharacterService, UserService } from '../../../../services';

// Modelli
import { Character } from '../../../../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  public playerCharacters: Character[] = [];
  public playedDays = 0;

  constructor(
    private characterService: CharacterService,
    public userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getPlayerCharacters();
  }

  private getPlayerCharacters(): void {
    this.characterService.GetCharacters().subscribe(res => {
      if (!!res.payload) {
        this.playerCharacters = res.payload;

        let days = 0;
        this.playerCharacters.forEach(
          character => (days += character.playedDays)
        );

        this.playedDays = days;
      }
    });
  }

  public openCharactersList(): void {
    this.router.navigateByUrl('/player/characters');
  }

  public openEventsList(): void {
    this.router.navigateByUrl('/player/events');
  }
}
