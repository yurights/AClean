import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  srcUrl = 'wss://stream.binance.com:9443/ws/btcusdt@trade';
  private socket!: WebSocket;
  // webSocket$ = null;
  //constructor() {}

  public createSocket() {
    this.socket = new WebSocket(this.srcUrl);
  }

  public createStream(): Observable<unknown> {
    const observable = new Observable((observer) => {
      this.socket.onmessage = (event) => observer.next(event.data);
      this.socket.onerror = (event) => observer.error(event);
      this.socket.onclose = () => observer.complete();
    });

    return observable;
  }

  public disconnetctSockeet() {
    this.socket.close();
  }
}
