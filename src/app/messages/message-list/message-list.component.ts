import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { ChangeDetectorRef } from '@angular/core';
import { MessageService } from '../messages.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})

export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();

    
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

  onDeleteLastMessage() {
    if (this.messages.length > 0) {
      this.messages.pop();
    }
  }
  
}
