import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatLogComponent } from './chat-log/chat-log.component';
import { WebSocketService } from '../../services/web-socket.service';
import { IChatMessage } from '../../modesl/interfaces';
import { NotificationService } from '../../services/notification.service';
import { filter, Observable } from 'rxjs';
import { messageDirections, WebSocketEventType } from '../../modesl/enums';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatListComponent, ChatLogComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: IChatMessage[] = [];
  chats: { chatId: string }[] = [];
  clientId = '';
  socetStream$!: Observable<unknown>;
  constructor(
    private socketService: WebSocketService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.socketService.createSocket();
    this.socetStream$ = this.socketService.createStream();
    this.socketService.getChats();
    this.socetStream$
      .pipe(
        filter((socketEvent) => {
          if (!socketEvent) return false;
          const resp: { chat_list: [] } = JSON.parse(socketEvent as string);
          return WebSocketEventType.LIST in resp;
        })
      )
      .subscribe((socketEvent) => {
        const resp: { chat_list: [] } = JSON.parse(socketEvent as string);
        this.chats = resp.chat_list.map((id) => ({ chatId: id }));
      });
  }
  ngOnDestroy(): void {
    this.socketService.disconnectSocket();
  }

  selectChat(ev: string) {
    this.messages = [];
    this.clientId = ev;
    this.socketService.openChat(ev);

    this.socetStream$.subscribe((socketData) => {
      const data = socketData as string;
      this.soundNotification(data);
      this.handleSocketEmmission(data);
    });
  }

  soundNotification(WSEvent: string) {
    if (WSEvent) {
      const message: { direction: string } = JSON.parse(WSEvent);
      if (message.direction === messageDirections.inc) {
        this.notificationService.alertIncomingMessage();
      }
    }
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
