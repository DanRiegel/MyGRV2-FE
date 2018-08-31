import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Pipes
import { FilterSkillsPipe } from './pipes/filter-skills.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [FilterSkillsPipe],
  declarations: [FilterSkillsPipe]
})
export class PipesModule {}
