import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = MOCKDOCUMENTS;
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new Subject<Document>();
  private maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    return this.documents.find((doc) => doc.id === id);
  }

  addDocument(document: Document): void {
    if (!document) {
        return;
    }

    this.maxDocumentId++;
    document.id = this.maxDocumentId.toString(); 
    this.documents.push(document);

    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
}


  updateDocument(updatedDocument: Document): void {
    const index = this.documents.findIndex(doc => doc.id === updatedDocument.id);
    if (index !== -1) {
      this.documents[index] = updatedDocument;
      this.documentListChangedEvent.next([...this.documents]);
    }
  }

  deleteDocument(document: Document): void {
    const index = this.documents.indexOf(document);
    if (index !== -1) {
      this.documents.splice(index, 1);
      this.documentListChangedEvent.next([...this.documents]);
    }
  }

  private getMaxId(): number {
    let maxId = 0;
    for (const doc of this.documents) {
      const currentId = parseInt(doc.id, 10);
      if (!isNaN(currentId) && currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}
