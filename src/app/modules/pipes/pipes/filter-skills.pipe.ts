import { Pipe, PipeTransform } from '@angular/core';

// Modelli
import { Skill } from '../../../models';

@Pipe({
  name: 'FilterSkills'
})
export class FilterSkillsPipe implements PipeTransform {
  transform(
    value: Skill[],
    selectedSkills: Skill[],
    filterText: string
  ): Skill[] {
    if (!value) {
      return null;
    }

    let skillsList = value;

    if (!!filterText && filterText !== '') {
      skillsList = skillsList.filter(
        skill =>
          skill.nome.toLowerCase().indexOf(filterText.toLowerCase()) > -1 ||
          skill.descrizione.toLowerCase().indexOf(filterText.toLowerCase()) > -1
      );
    }

    if (!!selectedSkills) {
      skillsList = skillsList.filter(
        skill =>
          !selectedSkills.find(selectedSkill => selectedSkill.id === skill.id)
      );
    }

    return skillsList;
  }
}
