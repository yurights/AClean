import { Component } from '@angular/core';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { IChatMessage } from '../../../modesl/interfaces';
import { messages } from '../../../stat/messages';

@Component({
  selector: 'app-chat-log',
  standalone: true,
  imports: [ChatMessageComponent],
  templateUrl: './chat-log.component.html',
  styleUrl: './chat-log.component.scss'
})
export class ChatLogComponent {
messages: IChatMessage[] = messages;

}
