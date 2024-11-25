import { Component } from '@angular/core';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatLogComponent } from './chat-log/chat-log.component';
import { WebSocketService } from '../../services/web-socket.service';
import { IChatMessage } from '../../modesl/interfaces';
import { NotificationService } from '../../services/notification.service';
import { Observable, share } from 'rxjs';
import { messageDirections } from '../../modesl/enums';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatListComponent, ChatLogComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  messages: IChatMessage[] = [];
  clientId = '';
  socetStream$!: Observable<unknown>;
  constructor(
    private socketService: WebSocketService,
    private notificationService: NotificationService
  ) {}

  selectChat(ev: string) {
    this.messages = [];
    this.clientId = ev;

    if (!this.socketService.isSocketConnected()) {
      this.socketService.createSocket();
    }

    this.socketService.openChat(ev);
    this.socetStream$ = this.socketService.createStream().pipe(share());

    setTimeout(() => {
      this.socetStream$.subscribe((socketData) => {
        if (socketData) {
          const message : {direction: string} = JSON.parse(socketData as string) ;
          if(message.direction ===  messageDirections.inc){
            this.notificationService.alertIncomingMessage();
          }
         
        }
      });
    }, 1000);

    this.socetStream$.subscribe((socketData) => {
      this.handleSocketEmmission(socketData as string);
    });
  }

  clearChats() {
    this.socketService.clearChats();
  }

  sendNewMessage(ev: string) {
    this.socketService.sendMessage(ev);
  }

  private handleSocketEmmission(message: string) {
    if (!message) return;
    const m = JSON.parse(message);
    this.messages.push(m);
  }
}
