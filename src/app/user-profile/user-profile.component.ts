import { Component, OnInit, NgModule } from '@angular/core';
import { Client } from 'app/shared/Models/Client';
// import { ToastrService } from 'ngx-toastr';
import {DataService} from '../data.service'
import { ClientService } from 'app/shared/Services/SrvClient/client.service';
import { FormControl } from '@angular/forms';
import { MatDateFormats } from '@angular/material/core';
import { Compte } from 'app/shared/Models/Compte';
import { Demande } from 'app/shared/Models/Demande';
import { DemandeService } from 'app/shared/Services/SvrDemande/demande.service';
import { DatePipe } from '@angular/common';
import { Console } from 'console';

declare var $: any;



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [DatePipe]
})
export class UserProfileComponent implements OnInit {
  cdClient = '';
  _ClientModelCode: Client[];
  _ClientModelAll: Client[];
  _CompteModel: Compte[];

  showEnrg = false;
showAct = true;

// declaration des inputs:
PseudoFormControl = new FormControl('');
NomFormControl = new FormControl('');
PrenomFormControl = new FormControl('');
AdresseFormControl = new FormControl('');
MailFormControl = new FormControl('');
MDPFormControl = new FormControl('');
DateNFormControl = new FormControl('');
BanqueFormControl = new FormControl('');
TelephoneFormControl = new FormControl('');
NumCinFormControl = new FormControl('');


// des variables qui contiennent les infos
ancienPseudo: string;
ancienMotDepasse: string;

nom: string;
pre: string;
dateN: MatDateFormats;
mobile: number;

public date = Date();
public _DemandeModel: Demande[];
public _DemandeModelDesCpt: Demande;
  constructor(private data: DataService, public _DemandeService: DemandeService, private datePipe: DatePipe,
    public _ClientService: ClientService )
    // private toastr: ToastrService)
    { this.getAllDemande();
   }


   ngOnInit(): void {

    this.data.share.subscribe(x => this.cdClient = x);
    console.log(this.cdClient);
    this._ClientService.getClientbyId(this.cdClient).subscribe(
     list => {
       this._ClientModelCode = list
       console.log(this._ClientModelCode);
     });
     this.getAllClient();
     this.getClientbyCode();

     this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
     console.log(this.date)
   }

 getAllClient() {
   this._ClientService.getAllClient().subscribe(
     list => {
       this._ClientModelAll = list
       console.log(this._ClientModelAll)
     });

 }


 getAllDemande() {
  this._DemandeService.getAllDemande().subscribe(
    list => {
      this._DemandeModel = list
    });
}

  getClientbyCode() {
    this._ClientService.getClientbyId(this.cdClient).subscribe(
      list => {
        this._ClientModelCode = list
        console.log(this._ClientModelCode);

        // get les infos de client
       this.PseudoFormControl.setValue(this._ClientModelCode.pseudo)
       this.NomFormControl.setValue(this._ClientModelCode.nom)
       this.PrenomFormControl.setValue(this._ClientModelCode.prenom)
       this.NumCinFormControl.setValue(this._ClientModelCode.numCin)
       this.MDPFormControl.setValue(this._ClientModelCode.motDePasse)
       this.MailFormControl.setValue(this._ClientModelCode.email)
       this.TelephoneFormControl.setValue(this._ClientModelCode.telephone)
       this.AdresseFormControl.setValue(this._ClientModelCode.adresse)
       // this.BanqueFormControl.setValue(this._ClientModelCode.banque)
        this.DateNFormControl.setValue(this._ClientModelCode.dateNaissance)
      console.log(this._ClientModelCode.dateNaissance)

       // gets les comptes:
       this._CompteModel = this._ClientModelCode.compte;
       console.log(this._CompteModel);

       // remplir les variables d'infos
       this.nom = this._ClientModelCode.nom;
       this.pre = this._ClientModelCode.prenom;
       this.mobile = this._ClientModelCode.telephone;
       this.dateN = this._ClientModelCode.dateNaissance;

       this.NomFormControl.disable()
       this.PrenomFormControl.disable()
       this.MDPFormControl.disable()
       this.AdresseFormControl.disable()
       this.TelephoneFormControl.disable()
       this.PseudoFormControl.disable()
       this.DateNFormControl.disable()
       this.NumCinFormControl.disable()
       this.MailFormControl.disable()
       this.BanqueFormControl.disable()
      });
  }


  ModifierClient() {
    let cmp = 0;


    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this._ClientModelAll.length; i++) {
      // tslint:disable-next-line:max-line-length
      if (this.MDPFormControl.value === this._ClientModelAll[i].motDePasse && (this.MDPFormControl.value !== this._ClientModelCode.motDePasse)) {  cmp = cmp + 1; }
    }

    if (cmp !== 0) {
      console.log('erreur');
      this.Notification_MDP_et_Pseudo_incorrect('top', 'right')

    }

    if ((this.PseudoFormControl.value === '') || (this.MDPFormControl.value === '')) {

      console.log('erreur');
    this.Notification_MDP_et_Pseudo_vides('top', 'right')
  }

     if (cmp === 0) {
       this._ClientModelCode.pseudo=this.PseudoFormControl.value;
       this._ClientModelCode.motDePasse=this.MDPFormControl.value;
       this._ClientModelCode.email=this.MailFormControl.value;
       this._ClientModelCode.adresse=this.AdresseFormControl.value;
       this._ClientModelCode.telephone=this.TelephoneFormControl.value;
       this._ClientModelCode.dateNaissance=this.DateNFormControl.value;

       console.log(this._ClientModelCode);

       this._ClientService.updateClient(this._ClientModelCode)
          .subscribe(
            res => {
              console.log(res);
            this.Notification_succes_Modif('top', 'right')
            this.getClientbyCode()
            },
            err => {
              console.log(err);
               this.Notification_echec_Modif('top', 'right')
            })
     }
     this.showAct = true;
     this.showEnrg = false;
     this.MDPFormControl.setValue(this.ancienMotDepasse)
     this.PseudoFormControl.setValue(this.ancienPseudo)
     this.NomFormControl.disable()
     this.PrenomFormControl.disable()
     this.MDPFormControl.disable()
     this.AdresseFormControl.disable()
     this.TelephoneFormControl.disable()
     this.PseudoFormControl.disable()
     this.DateNFormControl.disable()
     this.NumCinFormControl.disable()
     this.MailFormControl.disable()
     this.BanqueFormControl.disable()
  }


  activerModif() {
    this.ancienPseudo = this.PseudoFormControl.value;
    this.ancienMotDepasse = this.MDPFormControl.value;
  console.log(this.ancienMotDepasse)
  console.log(this.ancienPseudo)
    this.MDPFormControl.enable()
    this.AdresseFormControl.enable()
    this.TelephoneFormControl.enable()
    this.PseudoFormControl.enable()
    this.MailFormControl.enable()
    this.DateNFormControl.enable()

    this.showAct = false;
    this.showEnrg = true;
  }

  // Notification_succes_Modif(from, align) {
  //   // tslint:disable-next-line:max-line-length
  //   this.toastr.warning('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Modification avec <b> succes</b> ', '', {
  //     disableTimeOut: true,
  //     closeButton: true,
  //     enableHtml: true,
  //     toastClass: 'alert alert-success alert-with-icon',
  //     positionClass: 'toast-' + from + '-' +  align
  //   });
  // }
  Notification_succes_Modif(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: 'notifications',
        message: ' Modification effectuée avec <b>Succès</b> .'

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

  // Notification_echec_Modif(from, align) {
  //   // tslint:disable-next-line:max-line-length
  //   this.toastr.warning('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> <b> Echec</b> de Modification', '', {
  //     disableTimeOut: true,
  //     closeButton: true,
  //     enableHtml: true,
  //     toastClass: 'alert alert-warning alert-with-icon',
  //     positionClass: 'toast-' + from + '-' +  align
  //   });
  // }

  Notification_echec_Modif(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: 'notifications',
        message: ' <b> Echec</b> de Modification.'

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

  // Notification_MDP_et_Pseudo_incorrect(from, align) {
  //   // tslint:disable-next-line:max-line-length
  //   this.toastr.warning('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>
  // <b> Mot de Passe et pseudo</b> existent deja', '', {
  //     disableTimeOut: true,
  //     closeButton: true,
  //     enableHtml: true,
  //     toastClass: 'alert alert-warning alert-with-icon',
  //     positionClass: 'toast-' + from + '-' +  align
  //   });
  // }
  Notification_MDP_et_Pseudo_incorrect(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: 'notifications',
        message: ' Erreur : <b>Mot de passe et pseudo</b> Existent déja.'

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

  // Notification_MDP_et_Pseudo_vides(from, align) {
  //   // tslint:disable-next-line:max-line-length
  //   this.toastr.warning('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>
  // <b> champ Mot de Passe ou pseudo</b> vide, remplir les champs', '', {
  //     disableTimeOut: true,
  //     closeButton: true,
  //     enableHtml: true,
  //     toastClass: 'alert alert-warning alert-with-icon',
  //     positionClass: 'toast-' + from + '-' +  align
  //   });
  // }

  Notification_MDP_et_Pseudo_vides(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: 'notifications',
        message: ' Erreur : champ <b>Mot de passe ou pseudo</b> vide, remplir les champs.'

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


  desactiverCompte(i: number) {
    this.getAllDemande()
    const clientCD = this._ClientModelCode.codeClient
    console.log(clientCD)
    const ribCPT = this._CompteModel[i].rib
    console.log(ribCPT)

    this._DemandeModelDesCpt = new Demande()

    // incrementer les codes
    const ii = this._DemandeModel.length
    const dernierCodeDem = this._DemandeModel[ii - 1].codeDemande;
    console.log(dernierCodeDem)
    const nvCode = parseFloat(dernierCodeDem) + 1;


    console.log(nvCode)


   this._DemandeModelDesCpt.codeDemande = nvCode.toString()
   this._DemandeModelDesCpt.codeClient = clientCD
   this._DemandeModelDesCpt.rib = ribCPT
   this._DemandeModelDesCpt.typeDemande = 'desactiver compte'
   this._DemandeModelDesCpt.etatDemd = 'non traitée'
   this._DemandeModelDesCpt.dateDemande = this.date

   console.log(this._DemandeModelDesCpt);

  this._DemandeService.AddDemande(this._DemandeModelDesCpt)
          .subscribe(
            res => {
              console.log(res);
              this.Notification_succes_DesCPT('top', 'right')
            },
            err => {
              console.log(err);
              this.Notification_echec_DesCPT('top', 'right')
            })
            this.getAllDemande()

  }

  // Notification_echec_DesCPT (from, align) {
  //   // tslint:disable-next-line:max-line-length
  //   this.toastr.warning('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>
  // <b>erreur</b> d envoi de Demande Desactivation', '', {
  //     disableTimeOut: true,
  //     closeButton: true,
  //     enableHtml: true,
  //     toastClass: 'alert alert-warning alert-with-icon',
  //     positionClass: 'toast-' + from + '-' +  align
  //   });
  // }

  Notification_echec_DesCPT(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: 'notifications',
        message: ' <b>Echec</b> d envoi de la demande de desactivation , réssayer.'

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


  // Notification_succes_DesCPT(from, align) {
  //   // tslint:disable-next-line:max-line-length
  //   this.toastr.warning('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Demande envoyée avec <b> succee</b> ', '', {
  //     disableTimeOut: true,
  //     closeButton: true,
  //     enableHtml: true,
  //     toastClass: 'alert alert-success alert-with-icon',
  //     positionClass: 'toast-' + from + '-' +  align
  //   });
  // }

  Notification_succes_DesCPT(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: 'notifications',
        message: ' Demande envoyée avec <b> succee</b> .'

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



}
