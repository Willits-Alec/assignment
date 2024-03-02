import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../documents.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[];
  private subscription: Subscription;

  constructor(private documentService: DocumentService) {}

   ngOnInit(): void {
    console.log('DocumentListComponent ngOnInit() called');
    this.documents = this.documentService.getDocuments();
    console.log('Initial documents:', this.documents);
    this.subscription = this.documentService.documentListChangedEvent.subscribe((documents: Document[]) => {
      console.log('Document list changed:', documents);
      this.documents = documents;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe(); 
  }

  onSelect(document: Document) {
    console.log('Selected Document:', document);
    
  }
}
