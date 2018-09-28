import { Component, OnInit } from '@angular/core';

// Servizi
import { ErrorNotificationService } from '../../../../services';

// Modelli
import { ErrorNotification } from '../../../../models/';

@Component({
  selector: 'app-notify-error',
  templateUrl: './notify-error.component.html',
  styleUrls: ['./notify-error.component.sass']
})
export class NotifyErrorComponent implements OnInit {
  public notificationData: ErrorNotification = new ErrorNotification();

  public sending = false;
  public sent = false;
  public sentError = false;

  constructor(private errorNotificationService: ErrorNotificationService) {}

  ngOnInit() {}

  public sendError(): void {
    this.sending = true;

    this.errorNotificationService
      .SendErrorNotification(this.notificationData)
      .subscribe(
        res => {
          this.sending = false;
          this.sentError = !res.payload;
          this.sent = true;
        },
        error => {
          this.sending = false;
          this.sentError = true;
          this.sent = true;
        }
      );
  }
}
