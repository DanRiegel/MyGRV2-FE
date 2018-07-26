import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Servizi
import { CharacterService } from '../../../../services';

// Modelli
import { CharacterDTO } from '../../../../models';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.sass']
})
export class CharactersListComponent implements OnInit {
  public charactersList: CharacterDTO[] = [];

  constructor(
    private characterService: CharacterService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.characterService.GetCharacters().subscribe(res => {
      if (!res.payload) {
        return;
      }

      this.charactersList = res.payload;
    });
  }

  public openCharacter(characterId: number): void {
    this.router.navigate([characterId], { relativeTo: this.activatedRoute });
  }
}
