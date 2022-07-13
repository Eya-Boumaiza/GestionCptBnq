import { Component, OnInit } from '@angular/core';
import { Demande } from 'app/shared/Models/Demande';
// import { ToastrService } from 'ngx-toastr';
import { DemandeService } from 'app/shared/Services/SvrDemande/demande.service';
import { CompteService } from 'app/shared/Services/SrvCompte/compte.service';
import { Compte } from 'app/shared/Models/Compte';
import { Client } from 'app/shared/Models/Client';
import { ClientService } from 'app/shared/Services/SrvClient/client.service';
declare var $: any;


@Component({
  selector: 'app-notif-gerant',
  templateUrl: './notif-gerant.component.html',
  styleUrls: ['./notif-gerant.component.scss']
})
export class NotifGerantComponent implements OnInit {

  public _CompteModel: Compte[];
  public _DemandeModel: Demande[];
  public _DemandeModelActifs: Demande[];
  public _SelectedDem: Demande[];
  public _ClientNV: Client;
  public _ClientModel: Client[];
    constructor(public _ClientService: ClientService,
      public _CompteService: CompteService, public _DemandeService: DemandeService,
      // private toastr: ToastrService
      ) {
        this.getAllDemande();
     }
  ngOnInit(): void {
  }

  getAllDemande() {
    this._DemandeService.getAllDemande().subscribe(
      list => {
        this._DemandeModel = list
        // for (let i = 0; i < this._DemandeModel.length+1; i++)
        // {
        //   if(this._DemandeModel[i].etatDemd==='traitée')
        //   {this._DemandeModel.splice(i, 1);}
        //   console.log(this._DemandeModel)
        // }
      });
  }


  AcceptDMDdesCPT(i: number) {
    if (this._DemandeModel[i].typeDemande === 'desactiver compte') {
      const rib = this._DemandeModel[i].rib
      // getcompte
      this._CompteService.getComptebyRIB(rib).subscribe(
        list => {
          this._CompteModel = list

           // modifier etat compte
          this._CompteModel.actif = 'false'
          console.log(this._CompteModel);


          this._CompteService.updateCompte(this._CompteModel)
          .subscribe(
            res => {
              console.log(res);
                 this.Notification_succes_DesCPT('top', 'right')
            },
            err => {
              console.log(err);
            })
        });
               console.log(this._DemandeModel[i].etatDemd)
               this._DemandeModel[i].etatDemd = 'traitée'


         // update demande
         this._DemandeService.updateDemande(this._DemandeModel[i])
         .subscribe(
           res => {
             console.log(res);
              this._DemandeModel.splice(0, this._DemandeModel.length);
              this.getAllDemande();
           },
           err => {
             console.log(err);
             this._DemandeModel.splice(0, this._DemandeModel.length);
             this.getAllDemande();
           })

    } else if (this._DemandeModel[i].typeDemande === 'inscription') {
      // creation NVclient
      this._ClientNV = new Client()

      this._ClientService.getAllClient().subscribe(
        list => {
          this._ClientModel = list
          const ii = this._ClientModel.length
      const dernierCodeDem = this._ClientModel[ii - 1].codeClient;
      const nvCode = parseFloat(dernierCodeDem) + 1;

      this._ClientNV.codeClient = nvCode.toString()
      });

      this._ClientNV.adresse = this._DemandeModel[i].adresse
      this._ClientNV.motDePasse = this._DemandeModel[i].motDePasse
      this._ClientNV.nom = this._DemandeModel[i].nom
      this._ClientNV.numCin = this._DemandeModel[i].numCin
      this._ClientNV.prenom = this._DemandeModel[i].prenom
      this._ClientNV.pseudo = this._DemandeModel[i].pseudo
      this._ClientNV.telephone = this._DemandeModel[i].telephone
      this._ClientNV.email = this._DemandeModel[i].email
      this._ClientNV.dateNaissance = this._DemandeModel[i].dateNaissance
      this._ClientNV.dateCreation = this._DemandeModel[i].dateCreation

      this._ClientService.AddClient(this._ClientNV)
          .subscribe(
            res => {
              console.log(res);
              this.Notification_succes_inscr('top', 'right')
            },
            err => {
              console.log(err);
            })
console.log(this._DemandeModel[i].etatDemd)
            this._DemandeModel[i].etatDemd = ' traitée'
            // update demande
            this._DemandeService.updateDemande(this._DemandeModel[i])
            .subscribe(
              resu => {
                console.log(resu);
                this._DemandeModel.splice(0, this._DemandeModel.length);
                this.getAllDemande();
              },
              err => {
                console.log(err);
                this._DemandeModel.splice(0, this._DemandeModel.length);
                this.getAllDemande();
              })
    }
    }

    refuser(i: number) {
                 console.log(this._DemandeModel[i].etatDemd)
                 this._DemandeModel[i].etatDemd = 'refusée'
           // update demande
           this._DemandeService.updateDemande(this._DemandeModel[i])
           .subscribe(
             res => {
               console.log(res);
               this._DemandeModel.splice(0, this._DemandeModel.length);
               this.getAllDemande();
             },
             err => {
               console.log(err);
               this._DemandeModel.splice(0, this._DemandeModel.length);
               this.getAllDemande();
             })
             this.Notification_succes_Refu('top', 'right')
      }

    // Notification_succes_DesCPT(from, align) {
    //   // tslint:disable-next-line:max-line-length
    // this.toastr.warning('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Compte désactivé avec <b> succes</b> ', '', {
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
          message: 'Compte désactivé avec <b> succes</b> .'
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

    // Notification_succes_inscr(from, align) {
    //   // tslint:disable-next-line:max-line-length
    //  this.toastr.warning('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Client ajouter avec <b> succes</b> ', '', {
    //     disableTimeOut: true,
    //     closeButton: true,
    //     enableHtml: true,
    //     toastClass: 'alert alert-success alert-with-icon',
    //     positionClass: 'toast-' + from + '-' +  align
    //   });
    // }

    Notification_succes_inscr(from, align) {
      const type = ['', 'info', 'success', 'warning', 'danger'];
      const color = Math.floor((Math.random() * 4) + 1);
      $.notify({
          icon: 'notifications',
          message: ' Client ajouter avec <b> succes</b>  .'
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



    Notification_succes_Refu(from, align) {
      const type = ['', 'info', 'success', 'warning', 'danger'];
      const color = Math.floor((Math.random() * 4) + 1);
      $.notify({
          icon: 'notifications',
          message: 'Demande refusée .'
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
