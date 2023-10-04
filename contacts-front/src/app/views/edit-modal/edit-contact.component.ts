import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { NewContactService } from '../../service/contact.service';

interface Contact {
  nome: string;
  email: string;
  celular: string;
  telefone: string;
  favorito: boolean;
  ativo: boolean;
}

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditModalComponent implements OnInit {
  contactEdit!: string;
  contactForm: FormGroup;
  isValidated = true;
  data: any;

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private newContactServer: NewContactService,
    private route: Router,
    private router: ActivatedRoute,
    private contactServer: NewContactService
  ) {
    this.contactForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      telefone: ['', [Validators.pattern('^[0-9]{11}$')]],
      favorito: [false],
      ativo: [true],
    });
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.contactEdit = params['contact'];
      this.loadContactData(this.contactEdit);
    });
  }

  loadContactData(contactId: string) {
    this.contactServer.getContact(contactId).subscribe((response) => {
      const contactEdit: Contact = {
        nome: response.contact_name,
        email: response.contact_email,
        celular: response.contact_mobile,
        telefone: response.contact_phone,
        favorito: response.contact_is_favorite,
        ativo: response.contact_is_active,
      };
      this.contactForm.setValue(contactEdit);
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.submitContact();
    } else {
      this.isValidated = false;
    }
  }

  submitContact() {
    const payload = {
      contact_id: this.contactEdit,
      contact_name: this.contactForm.value.nome,
      contact_email: this.contactForm.value.email,
      contact_mobile: this.contactForm.value.celular,
      contact_phone: this.contactForm.value.telefone,
      contact_is_favorite: this.contactForm.value.favorito,
      contact_is_active: this.contactForm.value.ativo,
    };

    this.newContactServer.updatedContact(payload).subscribe((response) => {
      this.data = response;

      if (this.data.error && this.data.code === "already_exists") {
        this.toastrService.error('Esse número já existe!', 'Erro!');
      } else {
        this.toastrService.success('Contato atualizado com sucesso!', 'Sucesso!');
        this.route.navigate(['/']);
        this.contactForm.reset();
      }
    });
  }
}
