import { Routes } from '@angular/router';
import { LoginComponent } from './layouts/login/login.component';
import { ChatComponent } from './layouts/chat/chat.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: ChatComponent, canActivate: [AuthGuard] },
];
