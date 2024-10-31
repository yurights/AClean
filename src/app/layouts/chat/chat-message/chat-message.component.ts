import { Component, Input, OnInit } from '@angular/core';
import { IChatMessage } from '../../../modesl/interfaces';
import { alignsTexts } from '../../../modesl/enums';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
})
export class ChatMessageComponent implements OnInit {
  @Input() message: IChatMessage = {
    title: '',
    text: 'Наші майстри мають великий досвід у виведенні різних видів плям, включаючи  плями від домашніх улюбленців. Використовуємо сертифіковані екологічні    гіпоалергенні засоби, які ефективно видаляють плями та запахи. У нас були    випадки, коли вдавалося видалити навіть важкі плями, такі як кров або    мазут.',
    date: '15:10',
  };
  messageAline: alignsTexts = alignsTexts.right;

  ngOnInit(): void {
    this.messageAline = this.message.title
      ? alignsTexts.right
      : alignsTexts.left;
  }
}
