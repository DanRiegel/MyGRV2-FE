import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Pipes
import { FilterSkillsPipe } from './pipes/filter-skills.pipe';
import { CharacterDtoPipe } from './pipes/character-dto.pipe';
import { PlayerPipe } from './pipes/player.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [FilterSkillsPipe, CharacterDtoPipe, PlayerPipe],
  declarations: [FilterSkillsPipe, CharacterDtoPipe, PlayerPipe]
})
export class PipesModule {}
