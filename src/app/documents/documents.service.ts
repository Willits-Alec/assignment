import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = MOCKDOCUMENTS;

  documentChangedEvent = new EventEmitter<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    return this.documents.find((doc) => doc.id === id);
  }

  deleteDocument(document: Document): void {
    if (!document) {
      return;
    }
    const index = this.documents.indexOf(document);
    if (index !== -1) {
      this.documents.splice(index, 1);
      this.documentChangedEvent.emit([...this.documents]);
    }
  }

}
