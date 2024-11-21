import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IChatMessage } from '../../../modesl/interfaces';
import { alignsTexts, messageDirections } from '../../../modesl/enums';
import { format, parseISO } from 'date-fns'

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [],
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

  @Output() messageCreated = new EventEmitter<string>()

  messageAline: alignsTexts = alignsTexts.right;

  ngOnInit(): void {
    this.message.date = format(parseISO(this.message.date),'HH:mm')

    this.messageCreated.emit(this.message.date)

    this.messageAline =
      this.message.direction !== messageDirections.out
        ? alignsTexts.left
        : alignsTexts.right;
  }
}
