import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
private nom = new BehaviorSubject<string>('default data');
private profi = new BehaviorSubject<string>('default data');
public share = this.nom.asObservable();
public share2 = this.profi.asObservable();
constructor() { }

updateData(text) {
this.nom.next(text);
}
updateData2(text) {
  this.profi.next(text);
  }
}
