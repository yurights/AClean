import { Component } from '@angular/core';
import { ChatComponent } from '../../components/chat/chat.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ChatComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
