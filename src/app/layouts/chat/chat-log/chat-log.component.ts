import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { IChatMessage } from '../../../modesl/interfaces';
import { WebSocketService } from '../../../services/web-socket.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chat-log',
  standalone: true,
  imports: [ChatMessageComponent, MatButtonModule],
  templateUrl: './chat-log.component.html',
  styleUrl: './chat-log.component.scss',
})
export class ChatLogComponent implements OnInit, OnDestroy {
  id = '657594958';
  constructor(private socketService: WebSocketService) {}

  messages: IChatMessage[] = [];

  ngOnInit(): void {
    this.socketService.createSocket();

    //  this.socketService.sendMessage('657594958')
    this.socketService.socket.onopen = () => {
      console.info('Connetcion istablished');
      this.socketService.sendMessage(this.id);
      this.socketService.createStream().subscribe((d) => {
        console.log('Incomming meassage: ', d);
        if (typeof d === 'string' && d !== '') {
          const p = JSON.parse(d);
          this.messages.push(p);
        } else {
          console.log('--->>> ', d);
        }
      });
    };
  }

  ngOnDestroy(): void {
    this.socketService.disconnetctSocket();
  }

  send(value: string) {
    this.socketService.sendMessage(value);
    console.log(value);
  }
}
