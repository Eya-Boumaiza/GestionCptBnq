import { Component, OnInit } from '@angular/core';
import { ClientService } from 'app/shared/Services/SrvClient/client.service';
import { Client } from 'app/shared/Models/Client';
import { CompteService } from 'app/shared/Services/SrvCompte/compte.service';
import { Compte } from 'app/shared/Models/Compte';
// import { ToastrService } from 'ngx-toastr';
import { listenerCount } from 'cluster';
import { DatePipe } from '@angular/common';
declare var $: any;



export interface Element1 {
  codeClient: string;
  nom: string;
    prenom: string;
    numCin: number;
    solde: number;
    dateCreation: Date;
    rib: string;
    etatC: string;
}


@Component({
  selector: 'app-consulter-clients',
  templateUrl: './consulter-clients.component.html',
  styleUrls: ['./consulter-clients.component.scss']
})



export class ConsulterClientsComponent implements OnInit {

  _ClientModel: Client[];
  _ClientModelSupp: Client[];
  _CompteModel: Compte[];

  _CompteModelsupp: Compte[];
  public j = 0;
  public res: string;

  public clientAll: Element1 [] = [
  ];
  datePipe: any;


  constructor(
   // private toastr: ToastrService,
    public _ClientService: ClientService, public _CompteService: CompteService) {
    this.getAllClient(); }

  ngOnInit(): void {
  }



desactiverCompte(i: number) {
 const ribDes = this.clientAll[i].rib;
  console.log(ribDes);
  this.clientAll.splice(0, this.clientAll.length);
  this._ClientModel.splice(0, this._ClientModel.length);

  this._CompteService.getComptebyRIB(ribDes).subscribe(
    list => {
      this._CompteModel = list

      this._CompteModel.actif = 'false';
      console.log(this._CompteModel);

        this._CompteService.updateCompte(this._CompteModel)
        .subscribe(
          res => {
            console.log(res);
            this.Notification_succes_desactivation('top', 'right')
            this.getAllClient();
          })
  });
}



supprimerClient(i: number) {
  const clientSupp = this.clientAll[i].codeClient;
   console.log(clientSupp);

   this.clientAll.splice(i, 1);

   this._ClientService.getClientbyId(clientSupp).subscribe(
     list => {
       this._ClientModelSupp = list
       console.log(this._ClientModelSupp)

       this._CompteModelsupp = this._ClientModelSupp.compte
       console.log( this._CompteModelsupp)
      this.Notification_succes_suppression('top', 'right')

        // tslint:disable-next-line:prefer-for-of
      //   for (let j =0; j<this._CompteModelsupp.length;j++)
      //  { this._CompteService.deleteCompte(this._CompteModelsupp[j])
      //   .subscribe(
      //     resu => {
      //       console.log(resu);
      //     },
      //     err => {
      //       console.log(err);
      //     })
      //     // i1=i1+1;
      //   }

        // this._ClientService.deleteClient(this._ClientModelSupp[0])
        // .subscribe(
        //   resu => {
        //     console.log(resu);
        //   },
        //   err => {
        //     console.log(err);
        //   })

   });

 }


  getAllClient() {
    this._ClientService.getAllClient().subscribe(
      list => {
        this._ClientModel = list
        console.log(this._ClientModel);


        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this._ClientModel.length; i++) {
          this.j = 0;
          while (this._ClientModel[i].compte[this.j] !== undefined ) {

            if (this._ClientModel[i].compte[this.j].actif === 'true') {
            // remplir table clientAll
                  this.clientAll.push({
                    codeClient: this._ClientModel[i].codeClient,
                    nom: this._ClientModel[i].nom,
                    prenom : this._ClientModel[i].prenom,
                    numCin: this._ClientModel[i].numCin,
                    solde: this._ClientModel[i].compte[this.j].solde,
                    dateCreation: this._ClientModel[i].compte[this.j].dateCreation,
                    rib: this._ClientModel[i].compte[this.j].rib,
                    etatC: 'actif',
                  });

                 }

                 if (this._ClientModel[i].compte[this.j].actif === 'false') {
                  // remplir table clientAll
                        this.clientAll.push({
                          codeClient: this._ClientModel[i].codeClient,
                          nom: this._ClientModel[i].nom,
                          prenom : this._ClientModel[i].prenom,
                          numCin: this._ClientModel[i].numCin,
                          solde: this._ClientModel[i].compte[this.j].solde,
                          dateCreation: this._ClientModel[i].compte[this.j].dateCreation,
                          rib: this._ClientModel[i].compte[this.j].rib,
                          etatC: 'desactivé',
                        });

                       }
                 this.j = this.j + 1;
                }
              }
               console.log(this.clientAll);

      });

  }

  // Notification_succes_desactivation(from, align) {
  //   this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Compte desactivé <b>succès</b>', '', {
  //     disableTimeOut: true,
  //     closeButton: true,
  //     enableHtml: true,
  //     toastClass: 'alert alert-success alert-with-icon"',
  //     positionClass: 'toast-' + from + '-' +  align
  //   });
  // }

  Notification_succes_desactivation(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    const color = Math.floor((Math.random() * 4) + 1);
    $.notify({
        icon: 'notifications',
        message: 'Compte desactivé avec <b>succès</b>.'
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

  Notification_succes_suppression(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    const color = Math.floor((Math.random() * 4) + 1);
    $.notify({
        icon: 'notifications',
        message: 'Client supprimé avec <b>succès</b>.'
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
