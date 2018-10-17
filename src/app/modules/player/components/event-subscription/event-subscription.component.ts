import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Servizi
import {
  EventService,
  SubscriptionModesService,
  CharacterService,
  PaymentMethodsService,
  UserService
} from '../../../../services';

// Modelli
import {
  GameEvent,
  GameEventSubscription,
  GameEventSubscriptionCharacter,
  SubscriptionMode,
  CharacterDTO,
  PaymentMethod
} from '../../../../models';
import { ROLE_MASTER } from 'app/constants';

@Component({
  selector: 'app-event-subscription',
  templateUrl: './event-subscription.component.html',
  styleUrls: ['./event-subscription.component.sass']
})
export class EventSubscriptionComponent implements OnInit {
  private millisInADay = 1000 * 60 * 60 * 24;
  public gameEvent: GameEvent;
  public subscriptionData: GameEventSubscription;
  public eventDays: number;
  public availableDays: number[] = [];
  public selectedDays: number[] = [];
  public daysSubscriptions: {
    [key: string]: GameEventSubscriptionCharacter;
  } = {};
  public subscriptionModes: SubscriptionMode[] = [];
  public subscriptionTypes: { key: string; value: string }[] = [
    { key: 'PG', value: 'Personaggio' },
    { key: 'PNG', value: 'PNG' }
  ];
  public playerCharacters: CharacterDTO[] = [];
  public paymentMethods: PaymentMethod[] = [];

  public subscriptionError = false;

  constructor(
    private eventService: EventService,
    private subscriptionModesService: SubscriptionModesService,
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

        if (this.userService.HasRole(ROLE_MASTER)) {
          this.subscriptionTypes.push({ key: 'MASTER', value: 'Master' });
        }

        this.loadPaymentMethods();
        this.loadPlayerCharacters();
        this.loadEvent(eventId);
      }
    });
  }

  private loadPlayerCharacters(): void {
    this.characterService.GetCharacters().subscribe(res => {
      if (!!res.payload) {
        this.playerCharacters = res.payload;
      }
    });
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
          idgiocatore: this.userService.PlayerData.id,
          idevento: this.gameEvent.id
        };

        const startDate = new Date(this.gameEvent.datainizio).getTime();
        const endDate = this.gameEvent.datafine
          ? new Date(this.gameEvent.datafine).getTime()
          : new Date(this.gameEvent.datainizio).getTime();

        this.eventDays = 1 + (endDate - startDate) / this.millisInADay;
        this.availableDays = [];
        for (let i = 1; i <= this.eventDays; i++) {
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
