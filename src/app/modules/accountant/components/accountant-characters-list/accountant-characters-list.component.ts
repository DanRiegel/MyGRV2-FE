import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Servizi
import { CharacterService } from '../../../../services';

// Modelli
import { CharacterDTO } from '../../../../models';

// Utility
import { FileUtils } from '../../../../utils/fileUtils';

const FileSaver = require('file-saver');

@Component({
  selector: 'app-accountant-characters-list',
  templateUrl: './accountant-characters-list.component.html',
  styleUrls: ['./accountant-characters-list.component.sass']
})
export class AccountantCharactersListComponent implements OnInit {
  public charactersList: CharacterDTO[] = [];
  public selectedCharacters: { [key: string]: boolean } = {};
  public selectedCount = 0;
  public allChecked = false;
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

  public toggleCheckAll() {
    this.allChecked = !this.allChecked;

    this.charactersList.forEach(character => {
      this.selectedCharacters[`key${character.id}`] = this.allChecked;
    });

    this.selectedCount = this.allChecked ? this.charactersList.length : 0;
  }

  public toggleCheck(character: CharacterDTO) {
    this.selectedCharacters['key' + character.id] = !this.selectedCharacters[
      'key' + character.id
    ];

    this.selectedCount += this.selectedCharacters['key' + character.id]
      ? 1
      : -1;
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

  public printCharacterSheet(characterId: number) {
    this.characterService
      .PrintCharactersSheets([characterId])
      .subscribe(res => {
        if (!res.payload) {
          return;
        }

        const blob = FileUtils.b64toBlob(res.payload, 'application/zip');
        FileSaver.saveAs(blob, 'characters-sheets.zip');
      });
  }

  public printSelectedCharactersSheet() {
    const ids: number[] = [];
    for (const characterKey in this.selectedCharacters) {
      if (
        this.selectedCharacters.hasOwnProperty(characterKey) &&
        this.selectedCharacters[characterKey]
      ) {
        ids.push(parseInt(characterKey.replace('key', ''), null));
      }
    }

    this.characterService.PrintCharactersSheets(ids).subscribe(res => {
      if (!res.payload) {
        return;
      }

      const blob = FileUtils.b64toBlob(res.payload, 'application/zip');
      FileSaver.saveAs(blob, 'characters-sheets.zip');
    });
  }
}
