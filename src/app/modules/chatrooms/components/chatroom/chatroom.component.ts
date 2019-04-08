import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Servizi
import { ChatroomsService } from '../../services/chatrooms.service';
import { CharacterService } from '../../../../services';

// Modelli
import { Chatroom, Character, ChatroomMessaggio } from 'app/models';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.sass']
})
export class ChatroomComponent implements OnInit, OnDestroy {
  public showOverlay = true;

  public chatroom: Chatroom;
  public character: Character;
  public newMessageText: string;
  public isMaster = false;
  public pngName: string;

  public messages: ChatroomMessaggio[] = [];

  private lastCheck = Math.round(new Date().getTime() / 1000);

  // Impostata a true quando l'ultima chiamata di recupero messaggi precedenti non restituisce risultati
  public stopLoadingPrevious = false;

  private chatroomSubscription: any;

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

    this.chatroomSubscription = setInterval(
      () => this.loadNextMessages(),
      10000
    );
  }

  public loadChatroom(chatroomId: number): void {
    this.chatroomsService.GetChatroom(chatroomId).subscribe(resp => {
      if (resp.payload) {
        this.chatroom = resp.payload;

        if (this.chatroom.idpersonaggio === 0) {
          this.isMaster = true;
          this.loadPreviousMessages();
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
          this.loadPreviousMessages();
        }
      });
  }

  private loadPreviousMessages(): void {
    if (this.stopLoadingPrevious) {
      return;
    }

    let loadBefore = Math.round(new Date().getTime() / 1000);

    if (this.messages && this.messages.length > 0) {
      loadBefore = this.messages[0].dataora;
    }

    this.chatroomsService
      .GetChatroomPreviousMessages(this.chatroom.id, loadBefore)
      .subscribe(resp => {
        if (resp.payload) {
          if (resp.payload.length === 0) {
            this.stopLoadingPrevious = true;
            return;
          }

          this.messages = resp.payload.concat(this.messages);
          this.lastCheck = Math.round(new Date().getTime() / 1000);
        }
      });
  }

  private loadNextMessages(): void {
    if (this.messages && this.messages.length > 0) {
      this.lastCheck = this.messages[this.messages.length - 1].dataora;
    }

    this.chatroomsService
      .GetChatroomNextMessages(this.chatroom.id, this.lastCheck)
      .subscribe(resp => {
        if (resp.payload) {
          if (resp.payload.length === 0) {
            this.stopLoadingPrevious = true;
            return;
          }

          this.messages = this.messages.concat(resp.payload);
        }
      });
  }

  public sendMessage(): void {
    this.chatroomsService
      .SendChatroomMessage(this.chatroom.id, <ChatroomMessaggio>{
        idpersonaggio: this.character ? this.character.id : 0,
        nomepng: this.pngName ? this.pngName : null,
        messaggio: this.newMessageText
      })
      .subscribe(resp => {
        if (resp.payload) {
          this.newMessageText = null;
          this.loadNextMessages();
        } else if (resp.error && resp.message) {
          alert(resp.message);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.chatroomSubscription) {
      clearInterval(this.chatroomSubscription);
    }
  }
}
