import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { IChatMessage } from '../../../modesl/interfaces';
import { WebSocketService } from '../../../services/web-socket.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chat-log',
  standalone: true,
  imports: [ChatMessageComponent, MatButtonModule, MatSnackBarModule],
  templateUrl: './chat-log.component.html',
  styleUrl: './chat-log.component.scss',
})
export class ChatLogComponent implements OnInit, OnDestroy {
  id = '657594958';
  constructor(
    private socketService: WebSocketService,
    private snackBar: MatSnackBar
  ) {}

  messages: IChatMessage[] = [];

  ngOnInit(): void {
    this.socketService.createSocket();

    //  this.socketService.sendMessage('657594958')
    this.socketService.socket.onopen = () => {
    //  this.socketService.sendMessage(this.id);
      this.socketService.createStream().subscribe((d) => {
        console.log('Incomming meassage: ', d);
        this.handleSocketEmmission(d as string);
      });
    };
  }

  private handleSocketEmmission(message: string) {
    if (!message) return;
    const m = JSON.parse(message);
    this.messages.push(m);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  ngOnDestroy(): void {
    this.socketService.disconnetctSocket();
  }

  send(value: string) {
    this.socketService.sendMessage(value);
  }
}
