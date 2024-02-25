import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contacts: Contact[] = MOCKCONTACTS; 

  contactsListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new Subject<Contact>();

  constructor() {}

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    return this.contacts.find((c) => c.id === id);
  }

  deleteContact(contact: Contact): void {
    const index = this.contacts.indexOf(contact);
    if (index !== -1) {
      this.contacts.splice(index, 1);
      this.contactsListChangedEvent.next([...this.contacts]);
    }
  }


}
