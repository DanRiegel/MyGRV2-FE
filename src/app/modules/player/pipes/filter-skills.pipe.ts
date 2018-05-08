import { Pipe, PipeTransform } from '@angular/core';

// Modelli
import { Skill } from '../../../models';

@Pipe({
  name: 'FilterSkills'
})
export class FilterSkillsPipe implements PipeTransform {
  transform(value: Skill[], selectedSkills: Skill[]): Skill[] {
    if (!value) {
      return null;
    }

    if (!selectedSkills) {
      return value;
    }

    return value.filter(
      skill =>
        !selectedSkills.find(selectedSkill => selectedSkill.id === skill.id)
    );
  }
}
