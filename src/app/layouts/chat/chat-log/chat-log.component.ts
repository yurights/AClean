import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
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
  @Output() deleteChat: EventEmitter<string> = new EventEmitter<string>();
  @Output() sendMessage: EventEmitter<string> = new EventEmitter<string>();
  @Input() messages: IChatMessage[] = [];
  @Input() client = '';

  constructor(
    private socketService: WebSocketService,
    private snackBar: MatSnackBar
  ) {}

  ngOnChanges(): void {
    this.skrollToArea();
  }

  clearChats() {
    this.deleteChat.emit();
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
    this.sendMessage.emit(value);
  }
}
