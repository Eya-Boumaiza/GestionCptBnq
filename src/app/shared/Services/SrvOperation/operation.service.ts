import { Injectable } from '@angular/core';
import { Operation } from '../../Models/Operation';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class OperationService {
  private baseUrl = 'http://localhost:5003/Operations';
  constructor(public http: HttpClient) { }

  public AddOperation(_Operation: Operation) {
    return this.http.post(this.baseUrl + '/AddOperation', JSON.stringify(_Operation) , httpOptions );
  }

  public getAllOperation() {
    return this.http.get<Operation[]>(this.baseUrl + '/GetAllOperation');

  }

  public deleteOperation(_Operation: Operation[]) {
    return this.http.delete(this.baseUrl + '/DeleteOperation' + JSON.stringify(_Operation) , httpOptions);
  }
}
