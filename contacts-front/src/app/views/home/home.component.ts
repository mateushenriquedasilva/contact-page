import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { NewContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  contactList: any;
  contacts: any;
  bsModalRef: BsModalRef | undefined;

  contactSearchForm: FormGroup;
  isValidated = true;

  constructor(private fb: FormBuilder, private toastrService: ToastrService, private contactServer: NewContactService, private modalService: BsModalService, private router: Router) {
    this.contactSearchForm = this.fb.group({
      contact: [''],
    });
  }

  ngOnInit() {
    this.contactServer.getAllContact().subscribe((response) => {
      this.contacts = response;
      this.contactList = response;
    });
  }

  getContact() {
    if (this.contactSearchForm.value.contact != undefined && this.contactSearchForm.value.contact != "") {
      console.log(this.contactSearchForm.value.contact);
      
      this.contactServer.getContact(this.contactSearchForm.value.contact).subscribe((response) => {
        this.contactList = [response];
      });
    } else {
      this.contactList = this.contacts;
    }
  }

  getAllContact() {
    this.contactList = this.contacts;
  }

  isFavorite(contactId: number) {
    let payload = {};

    this.contactList.filter((contact: any) => {
      if (contact.contact_id === contactId && contact.contact_is_active === true) {
        contact.contact_is_favorite = contact.contact_is_favorite ? false : true;

        payload = {
          contact_id: contact.contact_id,
          contact_is_favorite: contact.contact_is_favorite
        }
      }
    });

    this.contactServer.contactIsFavorite(payload).subscribe((response) => {});
  }
}
