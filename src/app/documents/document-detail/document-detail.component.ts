import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { WindRefService } from '../../wind-ref.service';
import { Router } from '@angular/router';
import { DocumentService } from '../../documents/documents.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  @Input() document: Document;
  nativeWindow: any;

  constructor(
    private windRefService: WindRefService,
    private documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nativeWindow = this.windRefService.getNativeWindow();
    console.log('Received Document:', this.document);
  }
  
  onView(url: string): void {
    if (this.nativeWindow) {
      this.nativeWindow.open(url, '_blank');
    }
  }

  onEdit(): void {
    
  }

  onDelete(): void {
    // Call deleteDocument method
    this.documentService.deleteDocument(this.document); 
    // Navigate back to documents list
    this.router.navigate(['/documents']); 
  }
}
