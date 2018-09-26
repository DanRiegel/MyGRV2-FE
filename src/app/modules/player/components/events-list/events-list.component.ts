import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Servizi
import { EventService } from '../../../../services';

// Modelli
import { GameEvent, GameEventSubscriptionDTO } from '../../../../models';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.sass']
})
export class EventsListComponent implements OnInit {
  public eventsList: GameEvent[] = [];
  private userSubscriptions: GameEventSubscriptionDTO[] = [];
  private userIsSubscribedToEvent: { [key: string]: boolean } = {};

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit() {
    this.eventService.GetUserSubscriptions().subscribe(subRes => {
      if (subRes.payload) {
        this.userSubscriptions = subRes.payload;
      }

      this.eventService.GetNextEvents().subscribe(res => {
        if (!res.payload) {
          return;
        }

        this.eventsList = res.payload;

        this.eventsList.forEach(eventData => {
          this.userIsSubscribedToEvent[
            `key${eventData.id}`
          ] = !!this.userSubscriptions.find(
            subscriptionData => subscriptionData.idevento === eventData.id
          );
        });
      });
    });
  }

  public subscribeEvent(eventId: number): void {
    this.router.navigateByUrl(`/player/events/${eventId}/subscription`);
  }
}
