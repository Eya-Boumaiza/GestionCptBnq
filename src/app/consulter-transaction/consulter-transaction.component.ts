import { Component, OnInit } from '@angular/core';
import { OperationService } from 'app/shared/Services/SrvOperation/operation.service';
import { Operation } from 'app/shared/Models/Operation';
import { ClientService } from 'app/shared/Services/SrvClient/client.service';
import { Client } from 'app/shared/Models/Client';
import { CompteService } from 'app/shared/Services/SrvCompte/compte.service';
import { Compte } from 'app/shared/Models/Compte';
import { runInThisContext } from 'vm';

export interface Element1 {
  nom: string;
  prenom: string;
}
export interface Element2 {
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

@Component({
  selector: 'app-consulter-transaction',
  templateUrl: './consulter-transaction.component.html',
  styleUrls: ['./consulter-transaction.component.scss']
})
export class ConsulterTransactionComponent implements OnInit {
  public clicked = true;
  public clicked1 = false;
  public transf = true;
  public CredDeb = false;

  _OperationModel: Operation[];
  _ClientModel: Client[];
  _CompteModel: Compte[];
  public codeclt: string;
  public codecmpt: string;

  public var1: string;
  public var2: string;
  public var3: string;

  public _OperationModelT: Element2 [] = [
  ];
  public _OperationModelV: Element2 [] = [
  ];
  public _OperationModelR: Element2 [] = [
  ];
  public ClientDataT: Element1 [] = [
  ];
  public ClientDataV: Element1 [] = [
  ];
  public ClientDataR: Element1 [] = [
  ];

  constructor(public _OperationService: OperationService, public _ClientService: ClientService, public _CompteService: CompteService) {
    this.getOperation();
   }

  ngOnInit(): void {
  }

getOperation() {
  this._OperationService.getAllOperation().subscribe(
    list => {
      this._OperationModel = list



      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this._OperationModel.length; i++) {
        this.codecmpt = '';


        // remplir tab transfert
        if (this._OperationModel[i].typeOperation === 'transfert') {
            this.codecmpt = this._OperationModel[i].codeCompte;

            this._OperationModelT.push({
              typeOperation: this._OperationModel[i].typeOperation,
              dateOperation: this._OperationModel[i].dateOperation,
              montant: this._OperationModel[i].montant,
              soldeNv: this._OperationModel[i].soldeNv,
              compteADebiter: this._OperationModel[i].compteADebiter,
              compteACrediter: this._OperationModel[i].compteACrediter,
              codeCompte: this._OperationModel[i].codeCompte,
              ancienSolde : this._OperationModel[i].ancienSolde,
              ancienSoldeCred : this._OperationModel[i].ancienSoldeCred,
              ancienSoldeDeb : this._OperationModel[i].ancienSoldeDeb,
              nvSoldeCred : this._OperationModel[i].nvSoldeCred,
              nvSoldeDeb : this._OperationModel[i].nvSoldeDeb,
            });

                   // recuperer le compte qui correspond à ce codeCompte
                   this._CompteService.getComptebyId(this.codecmpt).subscribe(
                    list1 => {
                      this._CompteModel = list1
                     this.var1 = this._CompteModel.codeClient
                     console.log(this.var1)
                   // recuperer le client qui correspond à ce codeClient
                   this._ClientService.getClientbyId(this.var1).subscribe(
                    list2 => {
                      this._ClientModel = list2

                      this.ClientDataT.push({
                        nom: this._ClientModel.nom,
                        prenom : this._ClientModel.prenom,
                      });

                   });
              });
      }


       // remplir tab virement
       if (this._OperationModel[i].typeOperation === 'virement') {
        this.codecmpt = this._OperationModel[i].codeCompte;

        this._OperationModelV.push({
          typeOperation: this._OperationModel[i].typeOperation,
          dateOperation: this._OperationModel[i].dateOperation,
          montant: this._OperationModel[i].montant,
          soldeNv: this._OperationModel[i].soldeNv,
          compteADebiter: this._OperationModel[i].compteADebiter,
          compteACrediter: this._OperationModel[i].compteACrediter,
          codeCompte: this._OperationModel[i].codeCompte,
          ancienSolde : this._OperationModel[i].ancienSolde,
          ancienSoldeCred : this._OperationModel[i].ancienSoldeCred,
          ancienSoldeDeb : this._OperationModel[i].ancienSoldeDeb,
          nvSoldeCred : this._OperationModel[i].nvSoldeCred,
          nvSoldeDeb : this._OperationModel[i].nvSoldeDeb,
        });


               // recuperer le compte qui correspond à ce codeCompte
               this._CompteService.getComptebyId(this.codecmpt).subscribe(
                list1 => {
                  this._CompteModel = list1
                  console.log(this._CompteModel)

                  this.var2 = this._CompteModel.codeClient
                  console.log(this.var2)

               // recuperer le client qui correspond à ce codeClient
               this._ClientService.getClientbyId(this.var2).subscribe(
                list2 => {
                  this._ClientModel = list2

                  this.ClientDataV.push({
                    nom: this._ClientModel.nom,
                    prenom : this._ClientModel.prenom,
                  });

               });
          });
     }



        // remplir tab retrait
        if (this._OperationModel[i].typeOperation === 'retrait') {
          this.codecmpt = this._OperationModel[i].codeCompte;

          this._OperationModelR.push({
            typeOperation: this._OperationModel[i].typeOperation,
            dateOperation: this._OperationModel[i].dateOperation,
            montant: this._OperationModel[i].montant,
            soldeNv: this._OperationModel[i].soldeNv,
            compteADebiter: this._OperationModel[i].compteADebiter,
            compteACrediter: this._OperationModel[i].compteACrediter,
            codeCompte: this._OperationModel[i].codeCompte,
            ancienSolde : this._OperationModel[i].ancienSolde,
            ancienSoldeCred : this._OperationModel[i].ancienSoldeCred,
            ancienSoldeDeb : this._OperationModel[i].ancienSoldeDeb,
            nvSoldeCred : this._OperationModel[i].nvSoldeCred,
            nvSoldeDeb : this._OperationModel[i].nvSoldeDeb,
          });

                 // recuperer le compte qui correspond à ce codeCompte
                 this._CompteService.getComptebyId(this.codecmpt).subscribe(
                  list1 => {
                    this._CompteModel = list1

                  this.var3 = this._CompteModel.codeClient
                  console.log(this.var3)

                 // recuperer le client qui correspond à ce codeClient
                 this._ClientService.getClientbyId(this.var3).subscribe(
                  list2 => {
                    this._ClientModel = list2

                    this.ClientDataR.push({
                      nom: this._ClientModel.nom,
                      prenom : this._ClientModel.prenom,
                    });

                 });
            });
    }


    }
      console.log(this.ClientDataT);
      console.log(this._OperationModelT);
    });
}

}
