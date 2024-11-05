import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class ChatComponent implements OnInit, OnDestroy {
  constructor(private socketService: WebSocketService) {}

  ngOnInit(): void {
    this.socketService.connectSocket('connected');
  }

  ngOnDestroy(): void {
    this.socketService.disconnectSocket();
  }
}
