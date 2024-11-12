import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  srcUrl = 'wss://stream.binance.com:9443/ws/btcusdt@trade';
  src = 'wss://aclean-52e2f83f8d01.herokuapp.com/right-web-socket';
  id = '657594958';
   socket!: WebSocket;
  // webSocket$ = null;
  //constructor() {}

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

  public sendMessage(message: string) {
    this.socket.send(message);
  }

  public disconnetctSocket() {
    this.socket.close();
  }
}
