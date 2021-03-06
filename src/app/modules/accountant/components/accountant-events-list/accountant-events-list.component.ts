import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Componenti
import {
  ConfirmModalComponent,
  EditNoteModalComponent
} from '../../../../components';

// Moduli Esterni
import { BsModalService } from 'ngx-bootstrap/modal';

// Services
import { EventService, CharacterService } from '../../../../services';

// Models
import {
  GameEvent,
  GameEventSubscriptionDTO,
  GameEventDailySubscriptions,
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
  public dailySubscriptions: {
    [key: string]: GameEventDailySubscriptions[];
  } = {};

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

        this.generateDailySubscriptionsData(eventId);
      }
    });
  }

  public generateDailySubscriptionsData(eventId: number): void {
    const dailySubscriptionsList: GameEventDailySubscriptions[] = [];

    if (!!this.eventSubscriptions['key' + eventId]) {
      this.eventSubscriptions['key' + eventId].forEach(subscription => {
        subscription.dettagli.forEach(dett => {
          let dailyDetail: GameEventDailySubscriptions = dailySubscriptionsList.find(
            dailySubscr => dailySubscr.giorno === dett.giorno
          );

          if (!dailyDetail) {
            dailyDetail = <GameEventDailySubscriptions>{
              giorno: dett.giorno,
              pg: 0,
              png: 0,
              master: 0,
              pgpaganti: 0,
              pngpaganti: 0,
              masterpaganti: 0
            };
            dailySubscriptionsList.push(dailyDetail);
          }

          switch (dett.tipoiscrizione) {
            case 'PG':
              dailyDetail.pg++;
              if (subscription.pagata) {
                dailyDetail.pgpaganti++;
              }
              break;
            case 'PNG':
              dailyDetail.png++;
              if (subscription.pagata) {
                dailyDetail.pngpaganti++;
              }
              break;
            case 'MASTER':
              dailyDetail.master++;
              if (subscription.pagata) {
                dailyDetail.masterpaganti++;
              }
              break;
          }
        });
      });
    }

    this.dailySubscriptions['key' + eventId] = dailySubscriptionsList.sort(
      (item1, item2) => item1.giorno - item2.giorno
    );
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

  public editNote(
    eventId: number,
    eventSubscription: GameEventSubscriptionDTO
  ): void {
    const modalRef = this.bsModalService.show(EditNoteModalComponent);
    modalRef.content.noteText = eventSubscription.note;

    this.bsModalService.onHide.subscribe(() => {
      if (modalRef.content.result) {
        this.eventService
          .SetSubscriptionNotes(
            eventSubscription.id,
            modalRef.content.newNoteText
          )
          .subscribe(res => {
            if (res.payload) {
              this.loadEventSubscriptions(eventId);
            }
          });
      }
    });
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

  public printEventSubscribersList(eventData: GameEvent): void {
    this.eventService.printEventSubscribersList(eventData.id).subscribe(res => {
      if (!res.payload) {
        return;
      }

      const blob = FileUtils.b64toBlob(res.payload, 'application/pdf');
      FileSaver.saveAs(blob, 'lista-iscritti.pdf');
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
