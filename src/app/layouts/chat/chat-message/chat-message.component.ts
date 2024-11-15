import { Component, Input, OnInit } from '@angular/core';
import { IChatMessage } from '../../../modesl/interfaces';
import { alignsTexts, messageDirections } from '../../../modesl/enums';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
})
export class ChatMessageComponent implements OnInit {
  @Input() message: IChatMessage = {
    text: 'Наші майстри мають великий досвід у виведенні різних видів плям, включаючи  плями від домашніх улюбленців. Використовуємо сертифіковані екологічні    гіпоалергенні засоби, які ефективно видаляють плями та запахи. У нас були    випадки, коли вдавалося видалити навіть важкі плями, такі як кров або    мазут.',
    date: '15:10',
    userId: '',
    direction: messageDirections.inc,
  };
  messageAline: alignsTexts = alignsTexts.right;

  ngOnInit(): void {
    this.messageAline =
      this.message.direction !== messageDirections.out
        ? alignsTexts.left
        : alignsTexts.right;
  }
}
