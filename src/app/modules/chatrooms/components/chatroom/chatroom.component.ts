import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Servizi
import { ChatroomsService } from '../../services/chatrooms.service';
import { CharacterService } from '../../../../services';

// Modelli
import { Chatroom, Character } from 'app/models';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.sass']
})
export class ChatroomComponent implements OnInit {
  public chatroom: Chatroom;
  public character: Character;
  public newMessageText: string;
  public isMaster = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private chatroomsService: ChatroomsService,
    private characterService: CharacterService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('chatroomId')) {
        const chatroomId = +params.get('chatroomId');

        this.loadChatroom(chatroomId);
      }
    });
  }

  public loadChatroom(chatroomId: number): void {
    this.chatroomsService.GetChatroom(chatroomId).subscribe(resp => {
      if (resp.payload) {
        this.chatroom = resp.payload;

        if (this.chatroom.idpersonaggio === 0) {
          this.isMaster = true;
        } else {
          this.loadChatroomCharacter();
        }
      }
    });
  }

  private loadChatroomCharacter(): void {
    this.characterService
      .GetCharacter(this.chatroom.idpersonaggio)
      .subscribe(resp => {
        if (resp.payload) {
          this.character = resp.payload;
        }
      });
  }
}
