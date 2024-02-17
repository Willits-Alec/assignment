import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../documents.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Input() documents: Document[];
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChangedEvent.subscribe((documents: Document[]) => {
      this.documents = documents;
    });
  }

  onSelect(document: Document) {
    console.log('Selected Document:', document);
    this.documentService.documentSelectedEvent.emit(document);
  }
}
