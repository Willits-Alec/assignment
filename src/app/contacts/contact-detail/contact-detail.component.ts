import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContactsService } from '../contacts.service';


@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private contactService: ContactsService
  ) {}

  ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
          this.contact = this.contactService.getContact(params['id']);
      });
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
