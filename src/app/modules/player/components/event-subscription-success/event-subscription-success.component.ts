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
  selector: 'app-event-subscription-success',
  templateUrl: './event-subscription-success.component.html',
  styleUrls: ['./event-subscription-success.component.sass']
})
export class EventSubscriptionSuccessComponent implements OnInit {
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

        if (
          this.subscriptionData.descrizionemodalitapagamento &&
          this.subscriptionData.descrizionemodalitapagamento.indexOf(
            '--impo--'
          ) > -1
        ) {
          this.subscriptionData.descrizionemodalitapagamento = this.subscriptionData.descrizionemodalitapagamento.replace(
            '--impo--',
            this.subscriptionData.costotot.toString()
          );
        }
      }
    });
  }

  public GoToDashboard(): void {
    this.router.navigateByUrl('/');
  }
}
