import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  private apiUrl = `${environment.apiUrl}/visits`; 
  

  constructor(private http: HttpClient) {}

  demandeVisit(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/demande-visit`,
      data
    );
  }
}
