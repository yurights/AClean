import { Component } from '@angular/core';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatLogComponent } from './chat-log/chat-log.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatListComponent, ChatLogComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {}
