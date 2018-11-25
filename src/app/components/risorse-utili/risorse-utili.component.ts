import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-risorse-utili',
  templateUrl: './risorse-utili.component.html',
  styleUrls: ['./risorse-utili.component.sass']
})
export class RisorseUtiliComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  public apriRegolamento(): void {
    window.open(
      'http://www.deusgrv.it/wp-content/uploads/Regolamento-Deus-GRV-1.04.01.pdf',
      '_blank'
    );
  }

  public apriAmbientazione(): void {
    window.open(
      'http://www.deusgrv.it/wp-content/uploads/AMBIENTAZIONE-DEUS-Enon-Compendium-1043.pdf',
      '_blank'
    );
  }

  public apriTracciaBackground(): void {
    window.open(
      'http://www.deusgrv.it/wp-content/uploads/Decalogo-background-perfetto-1.0.pdf',
      '_blank'
    );
  }

  public apriAlberoAbilita(): void {
    window.open(
      'http://www.deusgrv.it/wp-content/uploads/Lista-Abilità-1.04.01.pdf',
      '_blank'
    );
  }
}
