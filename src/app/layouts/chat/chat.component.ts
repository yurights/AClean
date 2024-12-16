import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatLogComponent } from './chat-log/chat-log.component';
import { WebSocketService } from '../../services/web-socket.service';
import { IChatMessage } from '../../modesl/interfaces';
import { NotificationService } from '../../services/notification.service';
import { Observable } from 'rxjs';
import { messageDirections, WebSocketEventType } from '../../modesl/enums';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { MatSnackBarModule } from '@angular/material/snack-bar';
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
  first = 0;
  aChatConnected = false;
  socetStream$!: Observable<unknown>;
  constructor(
    private socketService: WebSocketService,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.socketService.createSocket();
    this.socetStream$ = this.socketService.createStream();
    this.socketService.getChats();
    this.socetStream$.subscribe((socketEvent) => {
      // console.log(socketEvent);
      if (!socketEvent) return;
      if (!this.first) {
        this.openSnackBar('Connection esteblished', 'OK');
        this.first++;
      }
      const resp: { chat_list: [] } = JSON.parse(socketEvent as string);
      if (WebSocketEventType.LIST in resp) {
        this.chats = resp.chat_list.map((id) => ({ chatId: id }));
      }
    });
  }
  ngOnDestroy(): void {
    this.socketService.disconnectSocket();
  }

  selectChat(ev: string) {
    this.messages = [];
    this.clientId = ev;
    this.socketService.openChat(ev);
    this.aChatConnected = false;

    this.socetStream$.subscribe((socketData) => {
      // this.snackBar.dismiss();
      if (!this.aChatConnected) {
        this.openSnackBar(`Chat ${ev} loaded`, 'OK');
        this.aChatConnected = true;
      }
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
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
    console.log('m : ', m);
    this.messages.push(m);
  }
}
