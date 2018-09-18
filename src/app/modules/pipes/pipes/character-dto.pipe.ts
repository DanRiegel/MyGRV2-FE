import { Pipe, PipeTransform } from '@angular/core';

// Modelli
import { CharacterDTO } from '../../../models';

@Pipe({
  name: 'CharacterFilter'
})
export class CharacterDtoPipe implements PipeTransform {
  transform(
    value: CharacterDTO[],
    userName: string,
    characterName: string
  ): CharacterDTO[] {
    if (!value) {
      return [];
    }

    let newList: CharacterDTO[] = [...value];

    if (userName && userName.trim() !== '') {
      newList = newList.filter(
        character =>
          !!character.userName &&
          character.userName.toLowerCase().indexOf(userName.toLowerCase()) > -1
      );
    }

    if (characterName && characterName.trim() !== '') {
      newList = newList.filter(
        character =>
          !!character.nome &&
          character.nome.toLowerCase().indexOf(characterName.toLowerCase()) > -1
      );
    }

    return newList;
  }
}
