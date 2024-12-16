import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = '';

  //constructor() {}
  isLogined() {
    if (this.currentUser) {
      return true;
    } else {
      return false;
    }
  }
}
