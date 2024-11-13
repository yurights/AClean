import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
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
export class ChatLogComponent implements OnInit, OnDestroy {
  private id = '657594958';
  @ViewChild('inputRef') inputArea!: ElementRef;
  @Input() messages: IChatMessage[] = [];

  constructor(
    private socketService: WebSocketService,
    private snackBar: MatSnackBar
  ) {}

  // messages: IChatMessage[] = [];

  ngOnInit(): void {
    // this.socketService.createSocket();

    // this.socketService.socket.onopen = () => {
    //   this.socketService.sendMessage(this.id);
    //   this.socketService.createStream().subscribe((d) => {
    //     console.log('Incomming meassage: ', d);
    //     this.handleSocketEmmission(d as string);
    //   });
    // };
    console.log()
  }

  // private handleSocketEmmission(message: string) {
  //   if (!message) return;
  //   this.skrollToArea();
  //   const m = JSON.parse(message);
  //   this.messages.push(m);
  // }

  private skrollToArea() {
    if (this.inputArea) {
      this.inputArea.nativeElement.scrollIntoView();
    }
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
