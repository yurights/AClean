import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  alert!: HTMLAudioElement;

  //constructor() {}

  alertIncomingMessage() {
    if (this.alert) {
      this.alert.play();
    } else {
      this.alert = new Audio();
      this.alert.src = '/notification1.mp3';
      this.alert.load();
      this.alert.play();
    }
  }
}
