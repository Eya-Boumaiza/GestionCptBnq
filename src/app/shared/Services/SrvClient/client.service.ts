import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Client } from '../../Models/Client';
import { Options } from 'selenium-webdriver/edge';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = 'http://localhost:5002/Clients';
  public _ClientModel = new Client();

  constructor(public http: HttpClient) { }

  public getAllClient() {
    return this.http.get<Client[]>(this.baseUrl + '/GetAllClient');

  }
  // tslint:disable-next-line:ban-types
  public getClientbyId(id: String) {
    return this.http.get<Client[]>(this.baseUrl + '/GetClient?CodeClient=' + id);
  }


  public updateClient(_ClientModel: Client[]) {
    return this.http.put(this.baseUrl + '/UpdClient', JSON.stringify(_ClientModel), httpOptions);
  }


  public deleteClient(_ClientModel1: Client) {
    return this.http.delete(this.baseUrl + '/DeleteClient'+ JSON.stringify(_ClientModel1) ,httpOptions);
  }

  public AddClient(_client: Client) {
    return this.http.post(this.baseUrl + '/AddClient', JSON.stringify(_client) , httpOptions );
  }
}


