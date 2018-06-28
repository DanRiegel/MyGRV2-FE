import { Character } from './character.model';

export class CharacterDTO extends Character {
  public userName: string;
  public raceName: string;
  public divinityName: string;
  public indoleName: string;
  public originName: string;
  public focusName: string;
}
