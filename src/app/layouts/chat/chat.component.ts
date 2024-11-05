import { Component, OnInit } from '@angular/core';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatLogComponent } from './chat-log/chat-log.component';
import { WebSocketService } from '../../services/web-socket.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatListComponent, ChatLogComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  messages: string[] = [];
  constructor(private socketService: WebSocketService) {}

  ngOnInit(): void {
    this.socketService.createSocket();
    this.socketService
      .createStream()
      .pipe(debounceTime(500))
      .subscribe((d) => {
        const data = JSON.parse(d as string);
        this.addMessage(data);
        console.log('Trade data:', data);
      });
  }

  addMessage(message: string) {
    if (this.messages.length >= 10) {
      this.messages = this.messages.slice(0, 9);
    }
    this.messages = [message.p, ...this.messages];
  }
}
