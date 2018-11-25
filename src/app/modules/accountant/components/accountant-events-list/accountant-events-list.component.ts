import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Componenti
import { ConfirmModalComponent } from '../../../../components';

// Moduli Esterni
import { BsModalService } from 'ngx-bootstrap/modal';

// Services
import { EventService, CharacterService } from '../../../../services';

// Models
import {
  GameEvent,
  GameEventSubscriptionDTO,
  RestResponse
} from '../../../../models';

// Utility
import { FileUtils } from '../../../../utils/fileUtils';
const FileSaver = require('file-saver');

@Component({
  selector: 'app-accountant-events-list',
  templateUrl: './accountant-events-list.component.html',
  styleUrls: ['./accountant-events-list.component.sass']
})
export class AccountantEventsListComponent implements OnInit {
  public nextEventsList: GameEvent[] = [];
  public oldEventsList: GameEvent[] = [];

  public showEventData: { [key: string]: boolean } = {};
  public eventSubscriptions: { [key: string]: GameEventSubscriptionDTO[] } = {};

  constructor(
    private eventService: EventService,
    private characterService: CharacterService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bsModalService: BsModalService
  ) {}

  ngOnInit() {
    this.loadEvents();
  }

  private loadEvents(): void {
    this.eventService.GetAllEvents().subscribe(res => {
      if (!res.payload) {
        return;
      }

      this.nextEventsList = [];
      this.oldEventsList = [];

      res.payload.forEach(eventItem => {
        const eventDate = new Date(eventItem.datainizio);

        if (eventDate > new Date()) {
          this.nextEventsList = [...this.nextEventsList, eventItem];
        } else {
          this.oldEventsList = [...this.oldEventsList, eventItem];
        }
      });

      this.oldEventsList = this.oldEventsList.sort(
        (event1: GameEvent, event2: GameEvent) => {
          return (
            new Date(event2.datainizio).getTime() -
            new Date(event1.datainizio).getTime()
          );
        }
      );
    });
  }

  public subscribePlayer(eventId: number): void {
    this.router.navigate([eventId, 'subscription'], {
      relativeTo: this.activatedRoute
    });
  }

  public toggleEventDetail(eventId: number): void {
    this.showEventData['key' + eventId] = !this.showEventData['key' + eventId];

    if (
      this.showEventData['key' + eventId] &&
      !this.eventSubscriptions['key' + eventId]
    ) {
      this.loadEventSubscriptions(eventId);
    }
  }

  private loadEventSubscriptions(eventId: number): void {
    this.eventService.GetEventSubscriptions(eventId).subscribe(res => {
      if (res.payload) {
        this.eventSubscriptions['key' + eventId] = res.payload;
      }
    });
  }

  public toggleSubscriptionPayment(
    subscription: GameEventSubscriptionDTO
  ): void {
    let updateCall: Observable<RestResponse<boolean>> = null;

    if (!subscription.pagata) {
      updateCall = this.eventService.SetSubscriptionAsPaid(subscription.id);
    } else {
      updateCall = this.eventService.SetSubscriptionAsUnpaid(subscription.id);
    }

    if (!updateCall) {
      return;
    }

    updateCall.subscribe(res => {
      if (res.payload) {
        subscription.pagata = !subscription.pagata;
      }
    });
  }

  public subscriptionHasCharacters(
    eventSubscription: GameEventSubscriptionDTO
  ): boolean {
    return (
      eventSubscription &&
      eventSubscription.dettagli.some(dettaglio => !!dettaglio.idpersonaggio)
    );
  }

  public printCharacterSheet(
    eventSubscription: GameEventSubscriptionDTO
  ): void {
    const characterIDs = eventSubscription.dettagli
      .filter(dettaglio => !!dettaglio.idpersonaggio)
      .map(dettaglio => dettaglio.idpersonaggio)
      .filter((elem, index, self) => index === self.indexOf(elem));

    this.characterService.PrintCharactersSheets(characterIDs).subscribe(res => {
      if (!res.payload) {
        return;
      }

      const blob = FileUtils.b64toBlob(res.payload, 'application/zip');
      FileSaver.saveAs(blob, 'characters-sheets.zip');
    });
  }

  public printEventCharacterSheet(eventData: GameEvent, onlyPaid = true): void {
    let eventSubscriptions = this.eventSubscriptions[`key${eventData.id}`];

    if (onlyPaid) {
      eventSubscriptions = eventSubscriptions.filter(
        subscription => subscription.pagata
      );
    }

    const characterIDs: number[] = [];
    eventSubscriptions.forEach(subscription => {
      const ids = subscription.dettagli
        .filter(dettaglio => !!dettaglio.idpersonaggio)
        .map(dettaglio => dettaglio.idpersonaggio)
        .filter((elem, index, self) => index === self.indexOf(elem));

      ids.forEach(characterId => {
        if (characterIDs.indexOf(characterId) === -1) {
          characterIDs.push(characterId);
        }
      });
    });

    if (!characterIDs || (characterIDs && characterIDs.length === 0)) {
      return;
    }

    this.characterService.PrintCharactersSheets(characterIDs).subscribe(res => {
      if (!res.payload) {
        return;
      }

      const blob = FileUtils.b64toBlob(res.payload, 'application/zip');
      FileSaver.saveAs(blob, 'characters-sheets.zip');
    });
  }

  public deleteSubscription(eventId: number, subscriptionId: number): void {
    const modalRef = this.bsModalService.show(ConfirmModalComponent);
    modalRef.content.title = 'Conferma eliminazione';
    modalRef.content.content = `Confermare l'eliminazione dell'iscrizione?`;
    modalRef.content.closebutton = `Annulla`;
    modalRef.content.okbutton = `Conferma`;

    this.bsModalService.onHide.subscribe(() => {
      if (modalRef.content.result) {
        this.eventService.RemoveSubscription(subscriptionId).subscribe(res => {
          if (res.payload) {
            this.loadEventSubscriptions(eventId);
          }
        });
      }
    });
  }
}
