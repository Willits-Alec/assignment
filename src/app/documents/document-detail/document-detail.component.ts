import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { WindRefService } from '../../wind-ref.service';
import { Router } from '@angular/router';
import { DocumentService } from '../documents.service'

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent {
  @Input() document: Document;
  nativeWindow: any;

  constructor(
    private windRefService: WindRefService,
    private documentService: DocumentService, // Inject DocumentService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nativeWindow = this.windRefService.getNativeWindow();
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
