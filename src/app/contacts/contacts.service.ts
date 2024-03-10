import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contactsListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new Subject<Contact>();

  private contacts: Contact[] = [];
  private maxContactId: number;

  constructor(private http: HttpClient) { }



  // HTTP REQUEST 'GET'
  getContacts(): Contact[] {
    const contactsUrl = 'https://api.jsonbin.io/v3/b/65ece2831f5677401f3b34ef';
    const headers = new HttpHeaders({
      'X-master-key': '$2a$10$g5HVycuum4uxGNoHgfy/UOewEyRLds.DqZiRrlAGVYtQSzaPjnTkO',
      'X-Access-Key': '$2a$10$Ceiw6Kc6iZwcEIXHar.dd.SBql/GPNgskiMFL7NZqVPUKLqdx60jq',
    });

    this.http.get<any>(contactsUrl, { headers }).subscribe((response) => {
      this.contacts = Object.values(response.record);
      this.contactsListChangedEvent.next(this.contacts);
      console.log(this.contacts);
    })
    
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    return this.contacts.find((c) => c.id === id);
  }

  deleteContact(contact: Contact) {
    if (!contact) return;
    const index = this.contacts.indexOf(contact);
    if (index < 0) return;
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

  updateContact(original: Contact, newContact: Contact) {
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
