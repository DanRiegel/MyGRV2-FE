import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

// Servizi
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  public conteggioRichieste = 0;

  private loaderSubscription: Subscription;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderSubscription = this.loaderService.conteggioRichieste.subscribe(
      res => {
        setTimeout(() => (this.conteggioRichieste = res));
      }
    );
  }

  ngOnDestroy(): void {
    if (!!this.loaderSubscription) {
      this.loaderSubscription.unsubscribe();
    }
  }
}
