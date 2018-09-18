import { Pipe, PipeTransform } from '@angular/core';

// Modelli
import { Player } from '../../../models';

@Pipe({
  name: 'PlayerFilter'
})
export class PlayerPipe implements PipeTransform {
  transform(
    value: Player[],
    nome: string,
    cognome: string,
    recapito: string,
    recapitomail: string
  ): Player[] {
    if (!value) {
      return [];
    }

    let newList: Player[] = [...value];

    if (nome && nome.trim() !== '') {
      newList = newList.filter(
        character =>
          !!character.nome &&
          character.nome.toLowerCase().indexOf(nome.toLowerCase()) > -1
      );
    }

    if (cognome && cognome.trim() !== '') {
      newList = newList.filter(
        character =>
          !!character.cognome &&
          character.cognome.toLowerCase().indexOf(cognome.toLowerCase()) > -1
      );
    }

    if (recapito && recapito.trim() !== '') {
      newList = newList.filter(
        character =>
          !!character.recapito &&
          character.recapito.toLowerCase().indexOf(recapito.toLowerCase()) > -1
      );
    }

    if (recapitomail && recapitomail.trim() !== '') {
      newList = newList.filter(
        character =>
          !!character.recapitomail &&
          character.recapitomail
            .toLowerCase()
            .indexOf(recapitomail.toLowerCase()) > -1
      );
    }

    return newList;
  }
}
