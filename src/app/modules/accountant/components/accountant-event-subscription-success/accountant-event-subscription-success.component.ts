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
import { GameEventSubscriptionDTO } from '../../../../models';

@Component({
  selector: 'app-accountant-event-subscription-success',
  templateUrl: './accountant-event-subscription-success.component.html',
  styleUrls: ['./accountant-event-subscription-success.component.sass']
})
export class AccountantEventSubscriptionSuccessComponent implements OnInit {
  public subscriptionData: GameEventSubscriptionDTO;

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('subscriptionId')) {
        const subscriptionId = +params.get('subscriptionId');

        this.loadSubscription(subscriptionId);
      }
    });
  }

  private loadSubscription(subscriptionId: number): void {
    this.eventService.GetSubscription(subscriptionId).subscribe(res => {
      if (!!res.payload) {
        this.subscriptionData = res.payload;
      }
    });
  }

  public GoToDashboard(): void {
    this.router.navigateByUrl('/');
  }
}
