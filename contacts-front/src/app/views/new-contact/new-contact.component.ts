import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { NewContactService } from '../../service/contact.service';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent {
  contactForm: FormGroup;
  isValidated = true;
  data: any;

  constructor(private fb: FormBuilder, private toastrService: ToastrService, private newContactServer: NewContactService) {
    this.contactForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]], 
      telefone: ['', [Validators.pattern('^[0-9]{11}$')]], 
      favorito: [false], 
      ativo: [true], 
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {

      const payload: Contact = {
        contact_name: this.contactForm.value.nome,
        contact_email: this.contactForm.value.email,
        contact_mobile: this.contactForm.value.celular,
        contact_phone: this.contactForm.value.telefone,
        contact_is_favorite: this.contactForm.value.favorito,
        contact_is_active: this.contactForm.value.ativo,
      }
     
      this.newContactServer.createNewContact(payload).subscribe((response) => {
        this.data = response;

        if (this.data.error && this.data.code === "already_exists") {
          this.toastrService.error('Esse contato já existe!', 'Erro!');
        } else {
          this.toastrService.success('Contato criado com sucesso!', 'Sucesso!');

          this.contactForm.reset();
        }
      });
    } else {
      this.isValidated = false; 
    }
  }
}