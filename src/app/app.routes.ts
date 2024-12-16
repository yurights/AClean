import { Routes } from '@angular/router';
import { LoginComponent } from './layouts/login/login.component';
import { ChatComponent } from './layouts/chat/chat.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent },
    {path: '', component: ChatComponent },
];
