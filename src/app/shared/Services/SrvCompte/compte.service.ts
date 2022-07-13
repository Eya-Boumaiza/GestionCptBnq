import { Injectable } from '@angular/core';
import { Compte } from '../../Models/Compte';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CompteService {
  private baseUrl = 'http://localhost:5001/Comptes';
  public _CompteModel: Compte[];

  constructor(public http: HttpClient) { }

  public getAllCompte() {
    return this.http.get<Compte[]>(this.baseUrl + '/GetAllCompte');
  }

  updateCompte(_CompteModel: Compte[]) {
    return this.http.put(this.baseUrl + '/UpdCompte', JSON.stringify(_CompteModel), httpOptions);
  }

  // tslint:disable-next-line:ban-types
  public getComptebyRIB(id: String) {
    return this.http.get<Compte[]>(this.baseUrl + '/GetCompteRib?=' + id);
  }

  // tslint:disable-next-line:ban-types
  public getComptebyClient(id: String) {
    return this.http.get<Compte[]>(this.baseUrl + '/GetCompteClient?=' + id);
  }

  // tslint:disable-next-line:ban-types
  public getComptebyId(id: String) {
    return this.http.get<Compte[]>(this.baseUrl + '/GetCompte?=' + id);
  }

  public deleteCompte(_CompteModel: Compte) {
    return this.http.delete(this.baseUrl + '/DeleteCompte' + JSON.stringify(_CompteModel) , httpOptions);
  }
}
