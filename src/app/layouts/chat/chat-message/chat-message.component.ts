import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IChatMessage } from '../../../modesl/interfaces';
import { alignsTexts, messageDirections } from '../../../modesl/enums';
import { format, parseISO } from 'date-fns';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
})
export class ChatMessageComponent implements OnInit {
  @Input() message: IChatMessage = {
    text: 'Наші майстри мають великий досвід у виведенні різних видів плям.',
    date: '15:10',
    userId: '',
    direction: messageDirections.inc,
  };

  messageTime = '';
  messageDateTime = '';

  @Output() messageCreated = new EventEmitter<string>();

  messageAline: alignsTexts = alignsTexts.right;

  ngOnInit(): void {
    this.messageTime = format(parseISO(this.message.date), 'HH:mm');
    this.messageDateTime = format(parseISO(this.message.date), 'LLLL d, yyyy, HH:mm');

    this.messageCreated.emit(this.message.date);

    this.messageAline =
      this.message.direction !== messageDirections.out
        ? alignsTexts.left
        : alignsTexts.right;
  }
}
