import { Component } from '@angular/core';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatLogComponent } from './chat-log/chat-log.component';
import { WebSocketService } from '../../services/web-socket.service';
import { IChatMessage } from '../../modesl/interfaces';

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
  constructor(private socketService: WebSocketService) {}

  selectChat(ev: string) {
    this.messages = [];
    this.clientId = ev;

    if (!this.socketService.socket) {
      this.socketService.createSocket();
    }

    this.socketService.openChat(ev);
    this.socketService.createStream().subscribe((d) => {
      console.log('Incomming meassage: ', d);
      this.handleSocketEmmission(d as string);
    });
  }

  private handleSocketEmmission(message: string) {
    if (!message) return;
    const m = JSON.parse(message);
    this.messages.push(m);
  }
}
