import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ClientService } from './shared/Services/SrvClient/client.service';
import { Client } from './shared/Models/Client';

import {DataService} from '../app/data.service'
import { Demande } from './shared/Models/Demande';
import { DemandeService } from './shared/Services/SvrDemande/demande.service';
import { CompteService } from './shared/Services/SrvCompte/compte.service';
import { Compte } from './shared/Models/Compte';
import { BanqueService } from './shared/Services/SrvBanque/banque.service';
import { Banque } from './shared/Models/Banque';
// import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { BanquierService } from './shared/Services/SrvBanquier/banquier.service';
import { Banquier } from './shared/Models/Banquier';
declare var $: any;

export interface Element1 {
  codeDemande: string;
         numCin: number;
         nom: string;
         prenom: string;
         email: string;
         telephone: number;
         dateNaissance: string;
         pseudo: string;
         motDePasse: string;
         adresse: string;
         rib: string;
         codeClient: string;
         codeCompte: string;
         solde: number;
         dateCreation: string;
         actif: string;
         banque: string;
         codeBanque: string;
         typeDemande: string;
         etatDemd: string;
         dateDemade: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})
export class AppComponent {
  public client: string
  public banquier: string

  title = 'Gestion_Comptes_Bancaire';
 public name = 'hi';

 NomUserFormControl = new FormControl('');
  MDPFormControl = new FormControl('');

  // les champs d'inscription
  NomFormControl = new FormControl('');
  PrenomFormControl = new FormControl('');
  PseudoInFormControl = new FormControl('');
  DateNFormControl = new FormControl('');
  AdresseFormControl = new FormControl('');
  TelephoneFormControl = new FormControl('');
  MDP1FormControl = new FormControl('');
  MDP2FormControl = new FormControl('');
  MailFormControl = new FormControl('');
  CinFormControl = new FormControl('');

  public demandeList: Element1 [] = [
  ];

showapp = false;
hidelog = false;
show2 = false

public clicked = true;
public clicked1 = false;
public test = false;

public _ClientModel: Client[];
public _ClientModel2: Client[];
public _DemandeModel: Demande[];
public _DemandeModelIn: Demande;
public _CompteModel: Compte[];
public _BanqueModel: Banque[];
public _BanqueModel2: Banque[];
public _BanquierModel: Banquier[];


listClient: string;
public cdBnq: string;
public nomBnq: string;

public date = Date();
  constructor(private data2: DataService , private data: DataService , private router: Router , public _ClientService: ClientService,
    public _CompteService: CompteService,
    // private toastr: ToastrService,
     public _DemandeService: DemandeService, public _BanquierService: BanquierService,
    public _BanqueService: BanqueService, private datePipe: DatePipe) {

    this.getAllClient();
    this.getAllDemande();
    this.getAllCompte();
    this.getAllBanques();
    this.getAllBanquier()
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    console.log(this.date)
  }

    getAllClient() {
      this._ClientService.getAllClient().subscribe(
        list => {
          this._ClientModel = list
          console.log(this._ClientModel)
        });
    }

    getAllBanquier() {
      this._BanquierService.getAllBnaquier().subscribe(
        list => {
          this._BanquierModel = list
        });
    }

    getAllCompte() {
      this._CompteService.getAllCompte().subscribe(
        list => {
          this._CompteModel = list
        });
    }

    getAllDemande() {
      this._DemandeService.getAllDemande().subscribe(
        list => {
          this._DemandeModel = list
        });
    }

    getAllBanques() {
      this._BanqueService.getAllBanque().subscribe(
        list => {
          this._BanqueModel = list
        });
    }


    connect1() {
      // connexion de client
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this._ClientModel.length; i++) {
     if ((this.NomUserFormControl.value === this._ClientModel[i].pseudo) && (this.MDPFormControl.value === this._ClientModel[i].motDePasse))
      {this.data.updateData(this._ClientModel[i].codeClient);
        console.log(this.data);
        // clientORbanquier
   this.client = 'client'
   this.data2.updateData2(this.client)
        this.showapp = true;
      this.hidelog = true;
    } else {}
    }

    // connexion de banquier
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this._BanquierModel.length; i++) {
      if ((this.NomUserFormControl.value === this._BanquierModel[i].pseudo) &&
      (this.MDPFormControl.value === this._BanquierModel[i].motDePasse)) {this.data.updateData(this._BanquierModel[i].codeBanquier);
        console.log(this.data);
        // clientORbanquier
   this.banquier = 'banquier'
   this.data2.updateData2(this.banquier)
        this.showapp = true;
      this.hidelog = true;
    }
    }

if (this.showapp === false && this.hidelog === false) {
  this.Notification_echec_cnx('top', 'right')
}


    // if(this.NomUserFormControl.value==='banquier')
    // {
    //   this.showapp=true;
    // this.hidelog=true;
    // }
    // this.router.navigateByUrl('/dashboard');
    this.NomUserFormControl.setValue('')
    this.MDPFormControl.setValue('')
      }

  // connect2(){
  //   this.show2=false;
  //   this.clicked=true;
  //   this.clicked1=false;
  // }



  SelectedBnq(value: string) {
    this.cdBnq = value;
    console.log(this.cdBnq);

    this._BanqueService.getBanquebyId(value).subscribe(
      list => {
        this._BanqueModel2 = list

        this.nomBnq = this._BanqueModel2.nomBanque;
      });
  }

  inscrire() {
this.getAllDemande()
    if ( this.NomFormControl.value === '' || this.PrenomFormControl.value === '' || this.PseudoInFormControl.value === ''
      || this.MDP1FormControl.value === '' || this.MDP2FormControl.value === '' || this.MailFormControl.value === ''
      || this.CinFormControl.value === '') {
        this.Notification_echecChamp_inscri('top', 'right');
      } else {

    this._DemandeModelIn = new Demande()

    // incrementer les codes
    const i = this._DemandeModel.length
    const dernierCodeDem = this._DemandeModel[i - 1].codeDemande;
    const nvCode = parseFloat(dernierCodeDem) + 1;
    console.log(dernierCodeDem)
    console.log(nvCode)

    const j = this._ClientModel.length
    const dernierCodeClt = this._ClientModel[j - 1].codeClient;
    const nvCodeClt = parseFloat(dernierCodeClt) + 1;

    const k = this._CompteModel.length
    const dernierCodeCmpt = this._CompteModel[k - 1].codeCompte;
    const nvCodeCmpt = parseFloat(dernierCodeCmpt) + 1;


  // remplir tableau demande

    // this.demandeList.push({
  //   codeDemande: nvCode.toString(),
  //   numCin:parseFloat(this.CinFormControl.value),
  //   nom: this.NomFormControl.value,
  //   prenom: this.PrenomFormControl.value,
  //   email: this.MailFormControl.value,
  //   telephone : parseFloat(this.TelephoneFormControl.value),
  //   dateNaissance :this.DateNFormControl.value,
  //   pseudo: this.PseudoInFormControl.value,
  //   motDePasse: this.MDP1FormControl.value,
  //   adresse: this.AdresseFormControl.value,
  //   rib : 'NULL',
  //   codeClient: nvCodeClt.toString(),
  //   codeCompte : nvCodeCmpt.toString(),
  //   solde :0,
  //   dateCreation :'NULL',
    //   actif : 'pas encore',
  //   banque : this.nomBnq,
  //   codeBanque : this.cdBnq,
  //   typeDemande : 'inscription',
  // });

  // this._DemandeModelIn=this.demandeList;

  this._DemandeModelIn.codeDemande = nvCode.toString()
  this._DemandeModelIn.numCin = parseFloat(this.CinFormControl.value)
  this._DemandeModelIn.nom = this.NomFormControl.value
  this._DemandeModelIn.prenom = this.PrenomFormControl.value
  this._DemandeModelIn.email = this.MailFormControl.value
  this._DemandeModelIn.telephone = parseFloat(this.TelephoneFormControl.value)
  this._DemandeModelIn.dateNaissance = this.DateNFormControl.value
  this._DemandeModelIn.pseudo = this.PseudoInFormControl.value
  this._DemandeModelIn.motDePasse = this.MDP1FormControl.value
  this._DemandeModelIn.adresse = this.AdresseFormControl.value
  this._DemandeModelIn.rib = 'NULL'
  this._DemandeModelIn.codeClient = nvCodeClt.toString()
  this._DemandeModelIn.codeCompte = nvCodeCmpt.toString()
  this._DemandeModelIn.solde = 0
  this._DemandeModelIn.dateCreation = 'NULL'
  this._DemandeModelIn.actif = 'pas encore'
  this._DemandeModelIn.banque = this.nomBnq
  this._DemandeModelIn.codeBanque = this.cdBnq
  this._DemandeModelIn.typeDemande = 'inscription'
  this._DemandeModelIn.etatDemd = 'non traitée'
  this._DemandeModelIn.dateDemande = this.date

  console.log(this._DemandeModelIn);

  this._DemandeService.AddDemande(this._DemandeModelIn)
          .subscribe(
            res => {
              console.log(res);
             this.Notification_succes_inscri('top', 'right')
             this.getAllDemande()
            },
            err => {
              console.log(err);
               this.Notification_echec_inscri('top', 'right')
            })


  this.show2 = false;
    this.clicked = true;
    this.clicked1 = false;

  this.annuler()
      }

}

annuler() {
  this.NomFormControl.setValue('');
  this.PrenomFormControl.setValue('');
  this.PseudoInFormControl.setValue('');
  this.DateNFormControl.setValue('');
  this.AdresseFormControl.setValue('');
  this.TelephoneFormControl.setValue('');
  this.MDP1FormControl.setValue('');
  this.MDP2FormControl.setValue('');
  this.MailFormControl.setValue('');
  this.CinFormControl.setValue('');
}

// Notification_succes_inscri(from, align) {
//   this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>  inscription avec <b>succès</b>', '', {
//     disableTimeOut: true,
//     closeButton: true,
//     enableHtml: true,
//     toastClass: 'alert alert-success alert-with-icon"',
//     positionClass: 'toast-' + from + '-' +  align
//   });
// }
Notification_succes_inscri(from, align) {
  const type = ['', 'info', 'success', 'warning', 'danger'];

  const color = Math.floor((Math.random() * 4) + 1);

  $.notify({
      icon: 'notifications',
      message: 'Inscription effectuée avec <b>Succès</b> .'

  }, {
      type: type[color],
      timer: 1500,
      placement: {
          from: from,
          align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
      '</div>'
  });
}

// Notification_echec_inscri(from, align) {
//   this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> <b>echec</b> dinscription', '', {
//     disableTimeOut: true,
//     closeButton: true,
//     enableHtml: true,
//     toastClass: 'alert alert-success alert-with-icon"',
//     positionClass: 'toast-' + from + '-' +  align
//   });
// }
Notification_echec_inscri(from, align) {
  const type = ['', 'info', 'success', 'warning', 'danger'];

  const color = Math.floor((Math.random() * 4) + 1);

  $.notify({
      icon: 'notifications',
      message: '<b>Echec</b> d Inscription .'

  }, {
      type: type[color],
      timer: 1500,
      placement: {
          from: from,
          align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
      '</div>'
  });
}

// Notification_echec_cnx(from, align) {
// this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>
// <b>Erreur</b> de connexion, mot de passe ou pseudo incorrect', '', {
//     disableTimeOut: true,
//     enableHtml: true,
//     closeButton: true,
//     toastClass: 'alert alert-danger alert-with-icon',
//     positionClass: 'toast-' + from + '-' +  align
//   });
//   }

Notification_echec_cnx(from, align) {
  const type = ['', 'info', 'success', 'warning', 'danger'];

  const color = Math.floor((Math.random() * 4) + 1);

  $.notify({
      icon: 'notifications',
      message: '<b>Echec</b> de connexion, mot de passe ou peudo incorrect .'

  }, {
      type: type[color],
      timer: 1500,
      placement: {
          from: from,
          align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
      '</div>'
  });
}

Notification_echecChamp_inscri(from, align) {
  const type = ['', 'info', 'success', 'warning', 'danger'];

  const color = Math.floor((Math.random() * 4) + 1);

  $.notify({
      icon: 'notifications',
      message: 'Veuillez remplisez les champs obligatoires.'

  }, {
      type: type[color],
      timer: 1500,
      placement: {
          from: from,
          align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
      '</div>'
  });
}

  decnx() {
    this.showapp = false;
    this.hidelog = false;
  }






}
