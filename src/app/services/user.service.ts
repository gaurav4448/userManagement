import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:3000/admin';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  }

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  fetchAll(): Observable<any> {
    return this.http.get(`${this.url}/admin`, {responseType: "json"})
    .pipe(
      catchError(this.errorHandlerService.handleError("fetchAll"))
    )
  }
  
  deleteData(id: any): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError("deleteData"))
    )

  }
}
