import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/services/message.service';

@Component({
  selector: 'app-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.css']
})
export class MessageBoardComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  messages: any = [];

  ngOnInit() {
    this.messageService.getMessages();
    this.messageService.getUpdatedMessages()
      .subscribe((messageData) => {
        this.messages = messageData.messages;
      });
  }
}
