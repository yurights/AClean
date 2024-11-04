import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private webSocket: Socket;
  private streamUrl = 'wss://stream.binance.com:9443/ws/btcusdt@trade';
  constructor() {
    this.webSocket = new Socket({
      url: this.streamUrl,
      options: {},
    });
  }
  // this method is used to start connection/handhshake of socket with server
  connectSocket(message: unknown) {
    this.webSocket.emit('connect', message);
  }

  // this method is used to get response from server
  receiveStatus() {
    return this.webSocket.fromEvent('/get-response');
  }

  // this method is used to end web socket connection
  disconnectSocket() {
    this.webSocket.disconnect();
  }
}
