import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  @Output() addMessageEvent = new EventEmitter<Message>();

  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;

  currentSender: string = 'Alec J Willits';

  constructor() {}

  ngOnInit(): void {}

  onSendMessage() {
    if (this.subject && this.subject.nativeElement) {
      const subject = this.subject.nativeElement.value;
      const msgText = this.msgText.nativeElement.value;
      const message = new Message('1', subject, msgText, this.currentSender);
      this.addMessageEvent.emit(message);
    }
  }
  

  onClear() {
    if (this.subject && this.subject.nativeElement) {
      this.subject.nativeElement.value = '';
    }
  
    if (this.msgText && this.msgText.nativeElement) {
      this.msgText.nativeElement.value = '';
    }
  }
  
}
