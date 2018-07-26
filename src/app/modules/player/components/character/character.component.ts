import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs/observable/forkJoin';

// Componenti
import { SkillDetailComponent } from '../../../../components';

// Moduli Esterni
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// Servizi
import { CommonService, CharacterService } from '../../../../services';

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

  // Dati Personaggio
  public character: Character;
  public usedPx = 0;

  // Filtri
  public searchBaseSkillTerm: string;
  public searchUnlockedSkillTerm: string;
  public searchSelectedSkillTerm: string;

  constructor(
    private commonService: CommonService,
    private characterService: CharacterService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bsModalService: BsModalService
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
    this.characterService.GetCharacter(characterId).subscribe(res => {
      if (!!res.payload) {
        this.character = res.payload;
        this.calcUsedPX();
        this.getUnlockedSkills();
      }
    });
  }

  private getUnlockedSkills(): void {
    const selectedSkills = this.character.selectedSkills.map(skill => skill.id);

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
    this.characterService
      .SaveCharacter(this.character)
      .subscribe(characterRes => {
        if (!!characterRes.payload) {
          this.characterService
            .RequestCharacterBackgroundApprovation(this.character.id)
            .subscribe(res => {
              if (!!res.payload) {
                this.character = res.payload;

                if (this.character.id === 0) {
                  this.router.navigate(['..', res.payload.id], {
                    relativeTo: this.activatedRoute
                  });
                }
              }
            });
        }
      });
  }

  public requestCharacterApprovation(): void {
    this.characterService
      .SaveCharacter(this.character)
      .subscribe(characterRes => {
        if (!!characterRes.payload) {
          this.characterService
            .RequestCharacterApprovation(this.character.id)
            .subscribe(res => {
              if (!!res.payload) {
                this.character = res.payload;

                if (this.character.id === 0) {
                  this.router.navigate(['..', res.payload.id], {
                    relativeTo: this.activatedRoute
                  });
                }
              }
            });
        }
      });
  }

  public requestSkillsApprovation(): void {
    this.characterService
      .SaveCharacter(this.character)
      .subscribe(characterRes => {
        if (!!characterRes.payload) {
          this.characterService
            .RequestSkillsApprovation(this.character.id)
            .subscribe(res => {
              if (!!res.payload) {
                this.character = res.payload;

                if (this.character.id === 0) {
                  this.router.navigate(['..', res.payload.id], {
                    relativeTo: this.activatedRoute
                  });
                }
              }
            });
        }
      });
  }

  public openSkillDetail(skill: Skill) {
    const modalRef = this.bsModalService.show(SkillDetailComponent);
    modalRef.content.skill = skill;
  }

  public toggleSkill(skill: Skill): void {
    const hasSkill = !!this.character.selectedSkills.find(
      item => item.id === skill.id
    );
    if (hasSkill) {
      this.character.selectedSkills = this.character.selectedSkills.filter(
        item => item.id !== skill.id
      );

      // Verifico se l'abilità che sto togliendo è prerequisito di un'altra abilità. In quel caso tolgo anche l'altra
      const childrenSkills: Skill[] = this.character.selectedSkills.filter(
        item =>
          item.prereq1_id === skill.id ||
          item.prereq2_id === skill.id ||
          item.prereq3_id === skill.id
      );

      childrenSkills.forEach(item => this.toggleSkill(item));

      this.calcUsedPX();
      this.getUnlockedSkills();
    } else {
      // Verifico di poter acquisire l'abilità con i PX a disposizione
      if (
        this.character.experiencePoints - this.usedPx >= skill.costopx &&
        this.character.skillsApprovationStatus === 0
      ) {
        this.character.selectedSkills = [
          ...this.character.selectedSkills,
          skill
        ];

        this.calcUsedPX();
        this.getUnlockedSkills();
      }
    }
  }

  private calcUsedPX(): void {
    let px = 0;
    this.character.selectedSkills.forEach(skill => (px += skill.costopx));

    this.usedPx = px;
  }

  public saveCharacter(): void {
    this.characterService.SaveCharacter(this.character).subscribe(res => {
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
