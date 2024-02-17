import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contactSelectedEvent = new EventEmitter<Contact>();

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }

  private contacts: Contact[] = [];

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id:string): Contact {
    return this.contacts.find((c) => c.id === id);
  }

  deleteContact(contact: Contact): void {
    const index = this.contacts.indexOf(contact);
    if (index !== -1) {
      this.contacts.splice(index, 1);
      this.contactSelectedEvent.emit(contact);
    }
  }

}


