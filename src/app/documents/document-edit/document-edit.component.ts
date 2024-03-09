import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../../documents/documents.service';
import { NgForm } from '@angular/forms'; 
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})

export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  docService: any;
  
  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      if (id === undefined || id === null) {
        this.editMode = false;
        return;
      }
      this.originalDocument = this.documentService.getDocument(id);
      if (
        this.originalDocument === undefined || 
        this.originalDocument === null
      ) {
        return;
      }
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    })
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newDocument = new Document(
      null,
      value.name,
      value.description,
      value.url
    );
    if (this.editMode) {
      // If document has an ID, update it
      this.docService.updateDocument(this.originalDocument, newDocument);
    } else {
      // If document doesn't have an ID, add it
      this.docService.addDocument(newDocument);
    }
    this.onCancel();
  }

  onCancel() {
    // Navigate back to the documents list without saving changes
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
