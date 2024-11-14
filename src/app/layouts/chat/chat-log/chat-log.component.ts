import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild,
} from '@angular/core';
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
export class ChatLogComponent implements OnDestroy, OnChanges {
  @ViewChild('inputRef') inputArea!: ElementRef;
  @Input() messages: IChatMessage[] = [];
  @Input() client = '';

  constructor(
    private socketService: WebSocketService,
    private snackBar: MatSnackBar
  ) {}

  ngOnChanges(): void {
    this.skrollToArea();
  }

  private skrollToArea() {
    if (this.inputArea) {
      this.inputArea.nativeElement.scrollIntoView();
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  ngOnDestroy(): void {
    this.socketService.disconnectSocket();
  }

  send(value: string) {
    this.socketService.sendMessage(value);
  }
}
