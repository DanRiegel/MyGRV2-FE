import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs/observable/forkJoin';

// Servizi
import { PlayerCommonService } from '../../services/player-common.service';
import { CommonService } from '../../../../services';

// Modelli
import { Character, KeyValue, Skill } from '../../../../models';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.sass']
})
export class CharacterComponent implements OnInit {
  public activeSection = 'bg';

  // Elementi Select
  public races: KeyValue[] = [];
  public divinities: KeyValue[] = [];
  public indoles: KeyValue[] = [];
  public provenances: KeyValue[] = [];
  public focuses: KeyValue[] = [];
  public baseSkills: Skill[] = [];
  public unlockedSkills: Skill[] = [];
  public characterSkills: Skill[] = [];

  // Dati Personaggio
  public character: Character;

  constructor(
    public playerCommonService: PlayerCommonService,
    private commonService: CommonService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('characterId')) {
        const characterId = +params.get('characterId');

        this.loadTables(characterId);
      }
    });
  }

  private loadTables(characterId: number): void {
    const tablesCalls = [
      this.commonService.getRaces(),
      this.commonService.getDivinities(),
      this.commonService.getIndoles(),
      this.commonService.getOrigins(),
      this.commonService.getFocuses(),
      this.commonService.getSkills()
    ];

    forkJoin(tablesCalls).subscribe(resps => {
      // Races
      if (!!resps[0].payload) {
        this.races = resps[0].payload;
      }

      // Divinities
      if (!!resps[1].payload) {
        this.divinities = resps[1].payload;
      }

      // Indoles
      if (!!resps[2].payload) {
        this.indoles = resps[2].payload;
      }

      // Provenances
      if (!!resps[3].payload) {
        this.provenances = resps[3].payload;
      }

      // Focuses
      if (!!resps[4].payload) {
        this.focuses = resps[4].payload;
      }

      // Base skills
      if (!!resps[5].payload) {
        this.baseSkills = resps[5].payload;
      }

      this.loadCharacter(characterId);
    });
  }

  private loadCharacter(characterId: number): void {
    if (!characterId || characterId === 0) {
      this.character = <Character>{ id: 0, approvationStatus: 0 };
      return;
    }

    this.commonService.GetCharacter(characterId).subscribe(res => {
      if (!!res.payload) {
        this.character = res.payload;
      }
    });
  }

  private getUnlockedSkills(): void {
    const selectedSkills = this.characterSkills.map(skill => skill.id);

    if (selectedSkills.length === 0) {
      this.unlockedSkills = [];
      return;
    }

    this.commonService.getSkills(selectedSkills).subscribe(res => {
      if (!!res.payload) {
        this.unlockedSkills = res.payload;
      }
    });
  }

  public requestBackgroundApprovation(): void {
    this.commonService
      .RequestCharacterBackgroundApproval(this.character.id)
      .subscribe(res => {
        if (!!res.payload) {
          this.character = res.payload;
        }
      });
  }

  public toggleSkill(skill: Skill): void {
    const hasSkill = !!this.characterSkills.find(item => item.id === skill.id);
    if (hasSkill) {
      this.characterSkills = this.characterSkills.filter(
        item => item.id !== skill.id
      );
    } else {
      this.characterSkills = [...this.characterSkills, skill];
    }

    this.getUnlockedSkills();
  }

  public saveCharacter(): void {
    this.commonService.SaveCharacter(this.character).subscribe(res => {
      if (!!res.payload) {
        // Se sto salvando un nuovo personaggio, ridireziono alla scheda appena salvata
        if (this.character.id === 0) {
          this.router.navigate(['..', res.payload.id], {
            relativeTo: this.activatedRoute
          });
          return;
        }

        // Altrimenti aggiorno la scheda presente sulla pagina
        this.character = res.payload;
      }
    });
  }

  public goToList(): void {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }
}
