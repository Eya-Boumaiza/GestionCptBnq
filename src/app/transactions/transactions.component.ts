import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DataService } from 'app/data.service';
import { CompteService } from 'app/shared/Services/SrvCompte/compte.service';
import { Compte } from 'app/shared/Models/Compte';
import { Operation } from 'app/shared/Models/Operation';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];








export interface Element1 {
  codeOperation: string;
    typeOperation: string;
    dateOperation: string;
    montant: number;
    soldeNv: number;
    compteADebiter: string;
    compteACrediter: string;
    codeCompte: string;
    ancienSolde: number;
    ancienSoldeCred: number;
    ancienSoldeDeb: number;
    nvSoldeCred: number;
    nvSoldeDeb: number;
}
export interface Element2 {
  code: string;
}
// export interface Element3 {
//   banq:string;
// }

const TransfertTab: Element1[] = [
];
const VirementTab: Element1[] = [
];
const retraitTab: Element1[] = [
];
const tabOp: Element1[] = [
];


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  public clicked = true;
  public clicked1 = false;
  public transf = true;
  public CredDeb = false;

  public j = 0;
  cdClient = '';

public  _CompteModel: Compte[];
public  _OperationModel: Operation[];
public  _OperationModelTransfert: Operation[];
public  _OperationModelRetrait: Operation[];
public  _OperationModelVirement: Operation[];

public BqT: Element2 [] = [
];
public BqV: Element2 [] = [
];
public BqR: Element2 [] = [
];
// public Bnq :Element2 []=[

// ];


  constructor(private data: DataService, public _CompteService: CompteService) { }

  // tslint:disable-next-line:member-ordering
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // tslint:disable-next-line:member-ordering
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  // tslint:disable-next-line:member-ordering
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.data.share.subscribe(x => this.cdClient = x);
    this.dataSource.paginator = this.paginator;
    this.getCompteCli();
  }

getCompteCli() {
  this._CompteService.getComptebyClient(this.cdClient).subscribe(
    list => {
      this._CompteModel = list
        console.log(this._CompteModel);

        // remplir le model Operation
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this._CompteModel.length; i++) {
          this.j = 0;
          while (this._CompteModel[i].operation[this.j] !== undefined) {

            // remplir table transfert
          if (this._CompteModel[i].operation[this.j].typeOperation === 'transfert') {
                  TransfertTab.push({
                    codeOperation: this._CompteModel[i].operation[this.j].codeOperation,
                    typeOperation : this._CompteModel[i].operation[this.j].typeOperation,
                    dateOperation: this._CompteModel[i].operation[this.j].dateOperation,
                    montant: this._CompteModel[i].operation[this.j].montant,
                    soldeNv: this._CompteModel[i].operation[this.j].soldeNv,
                    compteADebiter: this._CompteModel[i].operation[this.j].compteADebiter,
                    compteACrediter: this._CompteModel[i].operation[this.j].compteACrediter,
                    codeCompte: this._CompteModel[i].operation[this.j].codeCompte,
                    ancienSolde: this._CompteModel[i].operation[this.j].ancienSolde,
                    ancienSoldeDeb: this._CompteModel[i].operation[this.j].ancienSoldeDeb,
                    ancienSoldeCred: this._CompteModel[i].operation[this.j].ancienSoldeCred,
                    nvSoldeDeb: this._CompteModel[i].operation[this.j].nvSoldeDeb,
                    nvSoldeCred: this._CompteModel[i].operation[this.j].nvSoldeCred,
                  });
                 this._OperationModelTransfert = TransfertTab;
                 this.BqT.push({
                   code: this._CompteModel[i].banque, });
              }

              // remplir table virement
              if (this._CompteModel[i].operation[this.j].typeOperation === 'virement') {
                  VirementTab.push({
                    codeOperation: this._CompteModel[i].operation[this.j].codeOperation,
                    typeOperation : this._CompteModel[i].operation[this.j].typeOperation,
                    dateOperation: this._CompteModel[i].operation[this.j].dateOperation,
                    montant: this._CompteModel[i].operation[this.j].montant,
                    soldeNv: this._CompteModel[i].operation[this.j].soldeNv,
                    compteADebiter: this._CompteModel[i].operation[this.j].compteADebiter,
                    compteACrediter: this._CompteModel[i].operation[this.j].compteACrediter,
                    codeCompte: this._CompteModel[i].operation[this.j].codeCompte,
                    ancienSolde: this._CompteModel[i].operation[this.j].ancienSolde,
                    ancienSoldeDeb: this._CompteModel[i].operation[this.j].ancienSoldeDeb,
                    ancienSoldeCred: this._CompteModel[i].operation[this.j].ancienSoldeCred,
                    nvSoldeDeb: this._CompteModel[i].operation[this.j].nvSoldeDeb,
                    nvSoldeCred: this._CompteModel[i].operation[this.j].nvSoldeCred,
                  });
                 this._OperationModelVirement = VirementTab;
                 this.BqV.push({
                   code: this._CompteModel[i].banque, });
              }

              // remplir table retrait
              if (this._CompteModel[i].operation[this.j].typeOperation === 'retrait') {
                  retraitTab.push({
                    codeOperation: this._CompteModel[i].operation[this.j].codeOperation,
                    typeOperation : this._CompteModel[i].operation[this.j].typeOperation,
                    dateOperation: this._CompteModel[i].operation[this.j].dateOperation,
                    montant: this._CompteModel[i].operation[this.j].montant,
                    soldeNv: this._CompteModel[i].operation[this.j].soldeNv,
                    compteADebiter: this._CompteModel[i].operation[this.j].compteADebiter,
                    compteACrediter: this._CompteModel[i].operation[this.j].compteACrediter,
                    codeCompte: this._CompteModel[i].operation[this.j].codeCompte,
                    ancienSolde: this._CompteModel[i].operation[this.j].ancienSolde,
                    ancienSoldeDeb: this._CompteModel[i].operation[this.j].ancienSoldeDeb,
                    ancienSoldeCred: this._CompteModel[i].operation[this.j].ancienSoldeCred,
                    nvSoldeDeb: this._CompteModel[i].operation[this.j].nvSoldeDeb,
                    nvSoldeCred: this._CompteModel[i].operation[this.j].nvSoldeCred,
                  });
                 this._OperationModelRetrait = retraitTab;
                 this.BqR.push({
                   code: this._CompteModel[i].banque, });
              }
          this.j = this.j + 1;
        }
        }

 });


}

}

