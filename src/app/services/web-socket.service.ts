import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketEventType as WSEType } from '../modesl/enums';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  //srcUrl = 'wss://stream.binance.com:9443/ws/btcusdt@trade';
  src = 'wss://aclean-52e2f83f8d01.herokuapp.com/right-web-socket';
  private socket!: WebSocket;

  public createSocket() {
    this.socket = new WebSocket(this.src);
  }

  public createStream(): Observable<unknown> {
    const observable = new Observable((observer) => {
      this.socket.onmessage = (event) => observer.next(event.data);
      this.socket.onerror = (event) => observer.error(event);
      this.socket.onclose = () => observer.complete();
    });

    return observable;
  }

  openChat(chatId: string) {
    const params = `{"type": ${WSEType.OPEN}, "id": ${chatId}}`;
    if (this.socket.readyState !== 0) {
      this.socket.send(params);
      return;
    }
    this.socket.onopen = () => {
      this.socket.send(params);
    };
  }

  isSocketConnected() {
    const res = this.socket && this.socket.readyState ? true : false;
    return res;
  }

  clearChats() {
    const params = `{"type": ${WSEType.DLETE}}`;
    if (this.isSocketConnected()) {
      this.socket.send(params);
    } else {
      alert('FAILED');
    }
  }

  public sendMessage(message: string) {
    const p = `{"type": ${WSEType.SEND}, "text": "${message}"}`;
    this.socket.send(p);
  }

  public disconnectSocket() {
    this.socket.close();
  }
}
