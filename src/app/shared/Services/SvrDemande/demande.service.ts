import { Injectable } from '@angular/core';
import { Demande } from '../../Models/Demande';
import { HttpHeaders, HttpClient } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private baseUrl = 'http://localhost:5004/Demandes';

  constructor(public http: HttpClient) { }

  public getAllDemande() {
    return this.http.get<Demande[]>(this.baseUrl + '/GetAllDemande');

  }

  public AddDemande(_Demande: Demande) {
    return this.http.post(this.baseUrl + '/AddDemande', JSON.stringify(_Demande) , httpOptions );
  }

  updateDemande(_Demande: Demande) {
    return this.http.put(this.baseUrl + '/UpdDemande', JSON.stringify(_Demande), httpOptions);
  }

  public getDemandeById(id: string) {
    return this.http.get<Demande[]>(this.baseUrl + '/GetDemande?=' + id);
  }
}
