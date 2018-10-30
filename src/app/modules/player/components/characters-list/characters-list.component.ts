import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Servizi
import {
  AppConfigurationService,
  CharacterService
} from '../../../../services';

// Modelli
import { CharacterDTO } from '../../../../models';

// Utility
import { FileUtils } from '../../../../utils/fileUtils';

const FileSaver = require('file-saver');

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.sass']
})
export class CharactersListComponent implements OnInit {
  public charactersList: CharacterDTO[] = [];
  public canCreateCharacters = false;
  public showPrintSheet = false;

  constructor(
    private appConfigurationService: AppConfigurationService,
    private characterService: CharacterService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.appConfigurationService.getAppConfiguration().subscribe(configRes => {
      if (configRes.payload) {
        this.showPrintSheet = configRes.payload.playerCanPrintCharacterSheet;
      }

      this.characterService.GetCharacters().subscribe(res => {
        if (!res.payload) {
          return;
        }

        this.charactersList = res.payload;
      });

      this.characterService.CanCreateCharacters().subscribe(res => {
        if (!res.payload) {
          return;
        }

        this.canCreateCharacters = res.payload;
      });
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
}
