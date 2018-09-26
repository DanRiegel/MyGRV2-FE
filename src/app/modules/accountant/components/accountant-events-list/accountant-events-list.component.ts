import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Services
import { EventService } from '../../../../services';

// Models
import {
  GameEvent,
  GameEventSubscriptionDTO,
  RestResponse
} from '../../../../models';

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
    private router: Router,
    private activatedRoute: ActivatedRoute
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

  public deleteSubscription(eventId: number, subscriptionId: number): void {
    this.eventService.RemoveSubscription(subscriptionId).subscribe(res => {
      if (res.payload) {
        this.loadEventSubscriptions(eventId);
      }
    });
  }
}
