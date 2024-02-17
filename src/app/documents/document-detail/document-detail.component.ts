import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { WindRefService } from '../../wind-ref.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent {
  @Input() document: Document;
  nativeWindow: any;
  documentService: any;
  router: any;

  constructor(private windRefService: WindRefService, router: Router) {}


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
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }
  
}
