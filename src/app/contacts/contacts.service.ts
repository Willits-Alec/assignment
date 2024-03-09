import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contactsListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new Subject<Contact>();

  private contacts: Contact[] = MOCKCONTACTS;
  private maxContactId: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    return this.contacts.find((c) => c.id === id);
  }

  deleteContact(contact: Contact) {
    if (!contact) return;
    const index = this.contacts.indexOf(contact);
    if (index < 0 ) return;
      this.contacts.splice(index, 1);
      this.contactsListChangedEvent.next(this.contacts.slice());
    }

    getMaxId(): number {
      let maxId = 0;
      this.contacts.forEach((c) => {
        if (+c.id > maxId) maxId = +c.id;
      });
      return maxId;
    }

    addContact(newContact: Contact) {
      if (newContact === null || newContact === undefined) return;
      this.maxContactId++;
      newContact.id = '$(this.newContactId)';
      this.contacts.push(newContact);
      this.contactsListChangedEvent.next(this.contacts.slice());
  }

  updateContact(original: Contact, newContact: Contact){
    if (
      newContact === null ||
      newContact === undefined ||
      original === null ||
      original === undefined
    ) {
      return;
    }
    const index = this.contacts.indexOf(original);
    if (index < 0) return;

    newContact.id = original.id;
    this.contacts.push(newContact);
    this.contactsListChangedEvent.next(this.contacts.slice());
  }

  }
