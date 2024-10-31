import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChatCardComponent } from '../chat-card/chat-card.component';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ChatCardComponent],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss',
})
export class ChatListComponent {
 
}
