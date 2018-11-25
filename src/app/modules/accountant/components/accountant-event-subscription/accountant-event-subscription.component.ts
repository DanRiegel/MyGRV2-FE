import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Servizi
import {
  EventService,
  SubscriptionModesService,
  CharacterService,
  PaymentMethodsService,
  UserService,
  PlayerService
} from '../../../../services';

// Modelli
import {
  GameEvent,
  GameEventSubscription,
  GameEventSubscriptionCharacter,
  SubscriptionMode,
  CharacterDTO,
  PaymentMethod,
  Player
} from '../../../../models';

// Utility
import { ConversionUtils } from 'app/utils/conversionUtils';

@Component({
  selector: 'app-accountant-event-subscription',
  templateUrl: './accountant-event-subscription.component.html',
  styleUrls: ['./accountant-event-subscription.component.sass']
})
export class AccountantEventSubscriptionComponent implements OnInit {
  private millisInADay = 1000 * 60 * 60 * 24;
  public gameEvent: GameEvent;
  public subscriptionData: GameEventSubscription;
  public eventDays: number;
  public selectedPlayer: Player;
  public availableDays: number[] = [];
  public availableDaysNames: string[] = [];
  public selectedDays: number[] = [];
  public daysSubscriptions: {
    [key: string]: GameEventSubscriptionCharacter;
  } = {};
  public subscriptionModes: SubscriptionMode[] = [];
  public subscriptionTypes: { key: string; value: string }[] = [
    { key: 'PG', value: 'Personaggio' },
    { key: 'PNG', value: 'PNG' }
  ];
  public players: Player[] = [];
  public playerCharacters: CharacterDTO[] = [];
  public paymentMethods: PaymentMethod[] = [];

  public subscriptionError = false;

  constructor(
    private eventService: EventService,
    private subscriptionModesService: SubscriptionModesService,
    private playerService: PlayerService,
    private characterService: CharacterService,
    private paymentMethodsService: PaymentMethodsService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('eventId')) {
        const eventId = +params.get('eventId');

        this.loadPlayers();
        this.loadPaymentMethods();
        this.loadEvent(eventId);
      }
    });
  }

  private loadPlayers(): void {
    this.playerService.GetPlayers().subscribe(res => {
      if (!!res.payload) {
        this.players = res.payload;
      }
    });
  }

  public loadPlayerCharacters(playerId: number): void {
    const numericID = Number(playerId);

    if (!isNaN(numericID)) {
      this.selectedPlayer = this.players.find(
        player => player.id === numericID
      );

      this.characterService.GetPlayerCharacters(playerId).subscribe(res => {
        if (!!res.payload) {
          this.playerCharacters = res.payload;
        }
      });
    }
  }

  private loadPaymentMethods(): void {
    this.paymentMethodsService.GetPaymentMethods().subscribe(res => {
      if (!!res.payload) {
        this.paymentMethods = res.payload;
      }
    });
  }

  private loadEvent(eventId: number): void {
    this.eventService.GetEvent(eventId).subscribe(res => {
      if (!!res.payload) {
        this.gameEvent = res.payload;

        this.subscriptionData = <GameEventSubscription>{
          id: 0,
          idgiocatore: 0,
          idevento: this.gameEvent.id,
          dataiscrizione: new Date()
        };

        const startDate = new Date(this.gameEvent.datainizio).getTime();
        const endDate = this.gameEvent.datafine
          ? new Date(this.gameEvent.datafine).getTime()
          : new Date(this.gameEvent.datainizio).getTime();

        this.eventDays = 1 + (endDate - startDate) / this.millisInADay;
        this.availableDaysNames = [];

        for (let i = 1; i <= this.eventDays; i++) {
          const newDay = new Date(startDate);
          newDay.setDate(newDay.getDate() + (i - 1));

          this.availableDaysNames = [
            ...this.availableDaysNames,
            ConversionUtils.dayOfWeekToString(newDay.getDay())
          ];
          this.availableDays = [...this.availableDays, i];
        }
      }
    });
  }

  public toggleDay(day: number): void {
    this.subscriptionData.idmodalitaiscrizione = null;

    if (this.daysSubscriptions['day' + day]) {
      delete this.daysSubscriptions['day' + day];
      this.selectedDays.splice(this.selectedDays.indexOf(day), 1);
    } else {
      this.daysSubscriptions['day' + day] = <GameEventSubscriptionCharacter>{
        giorno: day,
        tipoiscrizione: 'PG'
      };
      this.selectedDays.push(day);
    }

    this.selectedDays = this.selectedDays.sort((a: number, b: number) => a - b);
    this.loadSubscriptionModes();
  }

  private loadSubscriptionModes(): void {
    this.subscriptionModesService
      .GetEventSubscriptionModes(this.gameEvent.id, this.selectedDays.length)
      .subscribe(res => {
        if (!res.payload) {
          this.subscriptionModes = [];
          return;
        }

        this.subscriptionModes = res.payload;
      });
  }

  public characterSelectionIsValid(): boolean {
    let isValid = this.selectedDays && this.selectedDays.length > 0;
    this.selectedDays.forEach(day => {
      if (!this.daysSubscriptions['day' + day]) {
        isValid = false;
        return;
      }

      if (
        this.daysSubscriptions['day' + day].tipoiscrizione === 'PG' &&
        !this.daysSubscriptions['day' + day].idpersonaggio
      ) {
        isValid = false;
        return;
      }
    });

    return isValid;
  }

  public sendSubscription(): void {
    const daysConfiguration: GameEventSubscriptionCharacter[] = [];
    this.selectedDays.forEach(day => {
      if (this.daysSubscriptions['day' + day]) {
        daysConfiguration.push(this.daysSubscriptions['day' + day]);
      }
    });

    this.eventService
      .SubscribeToEvent(this.subscriptionData, daysConfiguration)
      .subscribe(res => {
        if (res.payload) {
          this.router.navigate(['success', res.payload], {
            relativeTo: this.activatedRoute
          });
        } else {
          this.subscriptionError = true;
        }
      });
  }
}
