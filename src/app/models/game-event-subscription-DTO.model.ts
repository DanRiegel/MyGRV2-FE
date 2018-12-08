import { GameEventSubscriptionCharacterDTO } from './game-event-subscription-character-DTO.model';

export class GameEventSubscriptionDTO {
  public id: number;
  public idevento: number;
  public nomeevento: string;
  public datainizio: string;
  public datafine: string;
  public dataiscrizione: string;
  public idgiocatore: number;
  public nomegiocatore: string;
  public cognomegiocatore: string;
  public idmodalitaiscrizione: number;
  public nomemodalitaiscrizione: string;
  public descrizionemodalitaiscrizione: string;
  public costo: number;
  public idmodalitapagamento: number;
  public nomemodalitapagamento: string;
  public descrizionemodalitapagamento: string;
  public costounit: number;
  public costoperc: number;
  public pagata: boolean;
  public costotot: number;
  public dettagli: GameEventSubscriptionCharacterDTO[];
  public note: string;
}
