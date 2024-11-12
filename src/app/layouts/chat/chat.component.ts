import { Component } from '@angular/core';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatLogComponent } from './chat-log/chat-log.component';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatListComponent, ChatLogComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  messages: string[] = [];
  constructor(private socketService: WebSocketService) {}

  addMessage(message: { p: string }) {
    if (this.messages.length >= 10) {
      this.messages = this.messages.slice(0, 9);
    }
    this.messages = [message.p, ...this.messages];
  }
}
