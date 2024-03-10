import { Component } from '@angular/core';
import { Contact } from './contact.model';
import { ContactsService } from './contacts.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})


export class ContactsComponent {
  selectedContact: Contact;

  private contacts: Contact[] = [];

  constructor(private contactService: ContactsService, private http: HttpClient) { }

  // HTTP REQUEST 'GET'
  getContacts() {
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

  ngOnInit() {
    // this.contactService.contactSelectedEvent.subscribe((contact: Contact) => {
    //   this.selectedContact = contact
    // })

    this.getContacts();
  }

}
