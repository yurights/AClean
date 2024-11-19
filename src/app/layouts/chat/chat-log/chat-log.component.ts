import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { IChatMessage } from '../../../modesl/interfaces';
import { WebSocketService } from '../../../services/web-socket.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chat-log',
  standalone: true,
  imports: [
    ChatMessageComponent,
    MatButtonModule,
    MatSnackBarModule,
    TextFieldModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './chat-log.component.html',
  styleUrl: './chat-log.component.scss',
})
export class ChatLogComponent implements OnDestroy, OnChanges {
  @ViewChild('chatLogRef') chatLog!: ElementRef;
  @Output() deleteChat: EventEmitter<string> = new EventEmitter<string>();
  @Output() sendMessage: EventEmitter<string> = new EventEmitter<string>();
  @Input() messages: IChatMessage[] = [];
  @Input() client = '';

  constructor(
    private socketService: WebSocketService,
    private snackBar: MatSnackBar
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHANGES', changes);
    this.scrollToArea();
  }

  getMessage() {
    setTimeout(() => {
      this.scrollToArea();
    }, 500);
  }

  clearChats() {
    this.deleteChat.emit();
  }

  private scrollToArea() {
    if (this.chatLog) {
      const container = this.chatLog.nativeElement;
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
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
