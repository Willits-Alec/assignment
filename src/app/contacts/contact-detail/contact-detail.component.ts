import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;

  constructor(
      private route: ActivatedRoute,
      private contactService: ContactsService
  ) {}

  ngOnInit(): void {
      this.route.params.subscribe(params => {
          const contactId = params['id'];
          this.contact = this.contactService.getContact(contactId);
      });
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(this.contact);
      // this.route.navigateByUrl('/contacts');
    }
  }
}
