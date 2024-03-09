import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new Subject<Document>();

  private documents: Document[] = [];
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

  addDocument(newDoc: Document) {
    if (newDoc === null || newDoc === undefined) return;
    this.maxDocumentId++;
    newDoc.id = '$(this.maxDocumentId)';
    this.documents.push(newDoc);
    this.documentListChangedEvent.next(this.documents.slice());
}
  updateDocument(original: Document, newDoc: Document){
    if (
      newDoc === null ||
      newDoc === undefined ||
      original === null ||
      original === undefined
    ) {
      return;
    }
    const index = this.documents.indexOf(original);
    if (index < 0) return;

    newDoc.id = original.id;
    this.documents.push(newDoc);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  deleteDocument(document: Document): void {
    if (!document) return;
    const index = this.documents.indexOf(document);
    if (index !== -1) {
      this.documents.splice(index, 1);
      this.documentListChangedEvent.next(this.documents.slice());
    }
  }

  getMaxId(): number {
    let maxId = 0;
    this.documents.forEach((d) => {
      if (+d.id > maxId) maxId = +d.id;
    });
    return maxId;
  }


}
