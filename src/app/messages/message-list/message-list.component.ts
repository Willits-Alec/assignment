import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {
  
  messages: Message[] = [
    new Message('1', 'message', 'you can now see the first message.', 'Mike'),
    new Message('2', 'message', 'you can now see the second message.', 'Sally'),
    new Message('3', 'message', 'you can now see the third message.', 'Jim'),
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  onAddMessage(message: Message) {
    this.messages.push(message);
    this.cdr.detectChanges();
  }

  onDeleteLastMessage() {
    if (this.messages.length > 0) {
      this.messages.pop();
    }
  }
  
}
