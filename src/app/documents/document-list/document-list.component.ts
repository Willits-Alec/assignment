import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../documents.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})

export class DocumentListComponent implements OnInit {
  // @Output() selectedDocumentEvent = new EventEmitter();

  documents: Document[] = [];
  selectedDocument: Document;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
  }
  
  onSelect(document: Document) {
    this.documentService.documentSelectedEvent.emit(document);

  }
}
