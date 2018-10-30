import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Componenti
import { NewMessageComponent } from '../new-message/new-message.component';

// Servizi
import { UserService, PlayerService, MessagingService } from '../../services/';

// Moduli Esterni
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.sass']
})
export class MessagingComponent implements OnInit {
  public conversations: any[] = [
    { sender: 'Gruppo Master' },
    { sender: 'Segreteria' },
    { sender: 'Daniele Rigoli', character: 'Mikhail Silverio' }
  ];

  public newMessageText: string;

  constructor(
    private userService: UserService,
    private playerService: PlayerService,
    private messagingService: MessagingService,
    private bsModalService: BsModalService
  ) {}

  ngOnInit() {}

  public openConversation(event: Event, conversation: any): void {
    event.preventDefault();
    event.stopPropagation();
  }

  public sendNewMessage(): void {
    const modalRef = this.bsModalService.show(NewMessageComponent);
  }
}
