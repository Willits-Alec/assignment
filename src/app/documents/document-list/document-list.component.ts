import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter();

  documents = [
    new Document('1', 'PlaceHolder 1', 'This is the placeholder doc 1.', 'https://www.byui.edu/1'),
    new Document('2', 'PlaceHolder 2', 'This is the placeholder doc 2.', 'https://www.byui.edu/2'),
    new Document('3', 'PlaceHolder 3', 'This is the placeholder doc 3.', 'https://www.byui.edu/3'),
    new Document('4', 'PlaceHolder 4', 'This is the placeholder doc 4.', 'https://www.byui.edu/4')
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }



}
