import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config';
import { Contact } from 'src/app/models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class NewContactService {

  constructor(private http: HttpClient) {}

  getAllContact(): Observable<any> {
    return this.http.get<any>(`${AppConfig.apiUrl}/contacts`);
  }

  getContact(parms: string): Observable<any> {
    return this.http.get<any>(`${AppConfig.apiUrl}/contact/${parms}`);
  }

  updatedContact(payload: any) {
    return this.http.put<any>(`${AppConfig.apiUrl}/contact`, payload);
  }

  createNewContact(payload: Contact): Observable<any> {
    return this.http.post<any>(`${AppConfig.apiUrl}/contact`, payload);
  }

  contactIsFavorite(payload: any) {
    return this.http.put<any>(`${AppConfig.apiUrl}/contact_favorite`, payload);
  }
}
