import { Injectable } from '@angular/core';
import { Banquier } from '../../Models/Banquier';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BanquierService {
  private baseUrl = 'http://localhost:5005/Banquiers';
  public _BnaquierModel = new Banquier();

  constructor(public http: HttpClient) { }

  public getAllBnaquier() {
    return this.http.get<Banquier[]>(this.baseUrl + '/GetAllBanquier');

  }
}
