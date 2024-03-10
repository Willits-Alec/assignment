import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { WindRefService } from '../../wind-ref.service';
import { Router, ActivatedRoute, Params, } from '@angular/router';
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
    private router: Router,
    private docService: DocumentService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.nativeWindow = this.windRefService.getNativeWindow();
    console.log('Received Document:', this.document);

    this.route.params.subscribe((params: Params) => {
      this.document = this.docService.getDocument(params['id']);
    });
  }

  onView(url: string): void {
    if (this.document.url) this.nativeWindow.open(this.document.url);
  }

  onDelete(): void {
    // Call deleteDocument method
    this.documentService.deleteDocument(this.document);
    // Navigate back to documents list
    this.router.navigate(['/documents']);
  }
}
