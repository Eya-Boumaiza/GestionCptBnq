import { Injectable } from '@angular/core';
import { Banque } from '../../Models/Banque';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BanqueService {
  private baseUrl = 'http://localhost:5000/Banques';

  constructor(public http: HttpClient) { }

  public getAllBanque() {
    return this.http.get<Banque[]>(this.baseUrl + '/GetAllBanque');
  }

  // tslint:disable-next-line:ban-types
  public getBanquebyId(id: String) {
    return this.http.get<Banque[]>(this.baseUrl + '/GetBanque?CodeBanque=' + id);
  }
}
