import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Servizi
import { EventService } from '../../../../services';

// Modelli
import { GameEvent } from '../../../../models';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.sass']
})
export class EventsListComponent implements OnInit {
  public eventsList: GameEvent[] = [];

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit() {
    this.eventService.GetNextEvents().subscribe(res => {
      if (!res.payload) {
        return;
      }

      this.eventsList = res.payload;
    });
  }

  public subscribeEvent(eventId: number): void {
    this.router.navigateByUrl(`/player/events/${eventId}/subscription`);
  }
}
