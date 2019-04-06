import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { ChatroomsService } from '../../services/chatrooms.service';

// Models
import { Chatroom } from 'app/models';

@Component({
  selector: 'app-chatrooms-list',
  templateUrl: './chatrooms-list.component.html',
  styleUrls: ['./chatrooms-list.component.sass']
})
export class ChatroomsListComponent implements OnInit {
  public chatrooms: Chatroom[] = [];

  constructor(
    private chatroomsService: ChatroomsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadChatrooms();
  }

  public loadChatrooms(): void {
    this.chatroomsService.GetChatrooms().subscribe(resp => {
      if (resp.payload) {
        this.chatrooms = resp.payload;
      }
    });
  }

  public enterRoom(event: Event, chatroomId: number): void {
    event.preventDefault();
    event.stopPropagation();

    this.router.navigate([chatroomId], {
      relativeTo: this.activatedRoute
    });
  }
}
