import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NewContactComponent } from './views/new-contact/new-contact.component';
import { EditModalComponent } from './views/edit-modal/edit-contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-contact', component: NewContactComponent },
  { path: 'edit-contact/:contact', component: EditModalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
