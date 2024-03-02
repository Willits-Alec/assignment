import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  private subscription: Subscription;

  constructor(private contactService: ContactsService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactsListChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSelected(contact: Contact): void {
    console.log('Selected contact:', contact);
  }

}
