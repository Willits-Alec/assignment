import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../../documents/documents.service';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent {
  @Input() document: Document;
  nativeWindow: any;
  
  constructor(
    private documentService: DocumentService,
  ) {}

  onSave(document: Document) {
    if (document.id) {
      // If document has an ID, update it
      this.documentService.updateDocument(document);
    } else {
      // If document doesn't have an ID, add it
      this.documentService.addDocument(document);
    }
  }
}
