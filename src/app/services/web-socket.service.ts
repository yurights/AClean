import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  srcUrl = 'wss://stream.binance.com:9443/ws/btcusdt@trade';
  socket!: WebSocket;
  //constructor() {}

  public createSocket() {
    this.socket = new WebSocket(this.srcUrl);
  }

  public disconnetctSockeet() {
    this.socket.close();
  }
}
