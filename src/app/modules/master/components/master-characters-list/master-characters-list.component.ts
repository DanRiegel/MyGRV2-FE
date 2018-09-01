import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Servizi
import { CharacterService } from '../../../../services';

// Modelli
import { CharacterDTO } from '../../../../models';

@Component({
  selector: 'app-master-characters-list',
  templateUrl: './master-characters-list.component.html',
  styleUrls: ['./master-characters-list.component.sass']
})
export class MasterCharactersListComponent implements OnInit {
  public charactersList: CharacterDTO[] = [];
  public filters: CharacterDTO = new CharacterDTO();

  constructor(
    private characterService: CharacterService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadCharacters();
  }

  private loadCharacters(): void {
    this.characterService.GetAllCharacters().subscribe(res => {
      if (!res.payload) {
        return;
      }

      this.charactersList = res.payload;
    });
  }

  public removePlayedDay(characterId: number): void {
    this.characterService.RemovePlayedDay(characterId).subscribe(res => {
      if (!res.payload) {
        return;
      }

      this.loadCharacters();
    });
  }

  public addPlayedDay(characterId: number): void {
    this.characterService.AddPlayedDay(characterId).subscribe(res => {
      if (!res.payload) {
        return;
      }

      this.loadCharacters();
    });
  }

  public openCharacter(characterId: number): void {
    this.router.navigate([characterId], { relativeTo: this.activatedRoute });
  }
}
