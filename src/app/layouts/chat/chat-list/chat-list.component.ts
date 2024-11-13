import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChatCardComponent } from '../chat-card/chat-card.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ChatCardComponent,
    MatCardModule,
  ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss',
})
export class ChatListComponent {
  @Output() selectChat = new EventEmitter<string>();

  @Input() chats: { chatId: string }[] = [
    { chatId: '1931805262' },
    { chatId: '657594958' },
  ];

  onSelectChat(chatId: string) {
    this.selectChat.emit(chatId);
  }
}
