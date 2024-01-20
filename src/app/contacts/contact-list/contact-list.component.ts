import { Component } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  contacts: Contact[] = [
    new Contact("1", "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771", "../assets/img/jacksonk.jpg", null),
    new Contact("2", "Rex Barzee", "barzeer@byui.edu", "208-496-3768", "../assets/img/barzeer.jpg", null)


  ];

  // contact1: Contact = { id: "1", name: "R. Kent Jackson", email: "jacksonk@byui.edu", phone: "208-496-3771", 
  // imageUrl: "../assets/img/jacksonk.jpg", group: [] };
  // contact2: Contact = { id: "1", name: "Rex Barzee", email: "barzeer@byui.edu", phone: "208-496-3768", 
  // imageUrl: "../assets/img/barzeer.jpg", group: [] };

}





