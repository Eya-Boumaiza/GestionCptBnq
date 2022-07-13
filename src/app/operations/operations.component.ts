import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service'
import { CompteService } from 'app/shared/Services/SrvCompte/compte.service';
import { Compte } from 'app/shared/Models/Compte';
import { FormControl } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import { OperationService } from 'app/shared/Services/SrvOperation/operation.service';
import { Operation } from 'app/shared/Models/Operation';
import { DatePipe } from '@angular/common';
// import { isNumeric } from 'rxjs/util/isNumeric';
declare var $: any;

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss'],
  providers: [DatePipe]
})
export class OperationsComponent implements OnInit {
  public value = new Date();
  RIBFormControl = new FormControl('');
  MontantFormControl = new FormControl('');
  RIBFormControlretir = new FormControl('');
  MontantFormControlretir = new FormControl('');
  RIBFormControltrans = new FormControl('');
  MontantFormControltrans = new FormControl('');
  CPTBenFormControltrans = new FormControl('');
  cdClient = '';

  AncienSolde;
  AncienSoldeBenif;
  AncienSoldeEmmet;
public RIB;
public RIBbenif;
public ccoodd = 12032;

_CompteModel: Compte[];
_CompteModelBenif: Compte[];
  _OperationModel: Operation[];
  _OperationModeltest: Operation[];
  _OperationModelADD: Operation;

  public clicked = true;
  public clicked1 = false;
  public clicked2 = false;
  public virer = true;
  public retirer = false;
  public transferer = false;

 public date = Date();
  constructor(private data: DataService, public _OperationService: OperationService,
     public _CompteService: CompteService,
     // private toastr: ToastrService,
     private datePipe: DatePipe) { }

  ngOnInit(): void {
    this._OperationModelADD = new Operation()
    console.log(this._OperationModelADD)
    this.getop()
    this.data.share.subscribe(x => this.cdClient = x);
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    console.log(this.date)
    this._OperationModelADD.dateOperation = this.date
  }

 clickVirer() {
  this.clicked = true;
  this.clicked1 = false;
  this.clicked2 = false;
  this.virer = true;
  this.retirer = false;
  this.transferer = false

  // retirer
         this.RIB = ''
         this.AncienSolde = ''
         this._OperationModelADD.montant = 0
         this._OperationModelADD.soldeNv = 0

  // transferer
         this.AncienSoldeEmmet = 0
         this.RIBbenif = ''
         this.AncienSoldeBenif = 0
         this._CompteModel.solde = 0
         this._CompteModelBenif.solde = 0
 }

 clickRetirer() {
  this.clicked = false;
  this.clicked1 = true;
  this.clicked2 = false;
  this.virer = false;
  this.retirer = true;
  this.transferer = false
  // virer
         this.RIB = ''
         this.AncienSolde = ''
         this._OperationModelADD.montant = 0
         this._OperationModelADD.soldeNv = 0
  // transferer

         this.AncienSoldeEmmet = 0
         this.RIBbenif = ''
         this.AncienSoldeBenif = 0
         this._CompteModel.solde = 0
         this._CompteModelBenif.solde = 0
 }

 clickTransferer() {
  this.clicked = false;
  this.clicked1 = false;
  this.clicked2 = true;
  this.virer = false;
  this.retirer = false;
  this.transferer = true
  // virer/retirer
         this.RIB = ''
         this.AncienSolde = ''
         this._OperationModelADD.montant = 0
         this._OperationModelADD.soldeNv = 0
 }



  getCompte() {
    if (this.virer) {
      console.log(this.RIBFormControl.value);
      this._CompteService.getComptebyRIB(this.RIBFormControl.value).subscribe(
        list => {
          this._CompteModel = list
            // this._OperationModeltest=this._CompteModel.operation;
            // console.log(this._OperationModeltest);
            console.log(this._CompteModel);
            console.log(this._CompteModel.solde);

          this.AncienSolde = this._CompteModel.solde;
          this.RIB = this._CompteModel.rib

          this._OperationModelADD.codeCompte = this._CompteModel.codeCompte
          this._OperationModelADD.compteADebiter = this._CompteModel.rib
          this._OperationModelADD.compteACrediter = 'null'
          this._OperationModelADD.typeOperation = 'virement'
        });
    } else if (this.retirer) {
      this._CompteService.getComptebyRIB(this.RIBFormControlretir.value).subscribe(
        list => {
          this._CompteModel = list
          console.log(this._CompteModel);
          this.AncienSolde = this._CompteModel.solde;
          this.RIB = this._CompteModel.rib

          this._OperationModelADD.codeCompte = this._CompteModel.codeCompte
          this._OperationModelADD.compteADebiter = this._CompteModel.rib
          this._OperationModelADD.compteACrediter = 'null'
          this._OperationModelADD.typeOperation = 'retrait'
        });
    } else {
      this._CompteService.getComptebyRIB(this.RIBFormControltrans.value).subscribe(
        list => {
          this._CompteModel = list
          console.log(this._CompteModel);
          this.AncienSoldeEmmet = this._CompteModel.solde;
          this.RIB = this._CompteModel.rib

          this._OperationModelADD.codeCompte = this._CompteModel.codeCompte
          this._OperationModelADD.compteADebiter = this._CompteModel.rib
          this._OperationModelADD.typeOperation = 'transfert'
        });

    }

    }
getBenif() {
  this._CompteService.getComptebyRIB(this.CPTBenFormControltrans.value).subscribe(
    list => {
      this._CompteModelBenif = list
      console.log(this._CompteModelBenif);
      this.AncienSoldeBenif = this._CompteModelBenif.solde;
      this._OperationModelADD.compteACrediter = this.CPTBenFormControltrans.value
      this.RIBbenif = this.CPTBenFormControltrans.value
    });
}

  getop() {
    this._OperationService.getAllOperation().subscribe(
      list => {
        this._OperationModel = list
        console.log(this._OperationModel);
        const i = this._OperationModel.length
        const dernierCodeOp = this._OperationModel[i - 1].codeOperation;
         const nvCode = parseFloat(dernierCodeOp) + 1
       // console.log(this.ccoodd)
       // this.ccoodd = this.ccoodd + 1;
      //  const nvCode = this.ccoodd ;
        this._OperationModelADD.codeOperation = nvCode.toString()
        console.log(this._OperationModelADD.codeOperation)
      });
    }

    validerVirement() {
      this.getop();
      if (!isNaN(this.MontantFormControl.value)) {

      if ( this._CompteModel.codeCompte === undefined) {
        console.log('erreur');
        this.Notification_RIB_incorrect('top', 'right')
      } else {
        const montant = parseFloat(this.MontantFormControl.value)
        const nvSolde = this.AncienSolde + montant
        this._CompteModel.solde=nvSolde

        console.log(this._CompteModel.solde)

        this._OperationModelADD.montant = montant
        this._OperationModelADD.soldeNv = nvSolde
        this._OperationModelADD.ancienSolde = this.AncienSolde

        console.log(this._CompteModel.solde)
        this._CompteService.updateCompte(this._CompteModel)
        .subscribe(
          res => {
            console.log(res);
            this.Notification_succes_virement('top', 'right')
          },
          err => {
            console.log(err);
            this.Notification_echec_virement('top', 'right')
          })

          console.log(this._OperationModelADD)
          this._OperationService.AddOperation(this._OperationModelADD)
          .subscribe(
            res => {
              console.log(res);
              this.getop();
            },
            err => {
              console.log(err);
            })
      }
     this.RIBFormControl.setValue('')
     this.MontantFormControl.setValue('')
    } else {
      this.Notification_echec_Solde('top', 'right')
         }
    }


    validerRetirement() {
      this.getop();
      if (!isNaN(this.MontantFormControlretir.value)) {
      if (this._CompteModel.codeCompte === undefined) {
        console.log('erreur');
        this.Notification_RIB_incorrect('top', 'right')
      } else {
        const montant = parseFloat(this.MontantFormControlretir.value)

        if (montant <= this.AncienSolde)  {
          const nvSolde = this.AncienSolde - montant
          this._CompteModel.solde = nvSolde

          this._OperationModelADD.montant = montant
          this._OperationModelADD.soldeNv = nvSolde
          this._OperationModelADD.ancienSolde = this.AncienSolde

          console.log(this._CompteModel.solde)
          this._CompteService.updateCompte(this._CompteModel)
          .subscribe(
            res => {
              console.log(res);
             this.Notification_succes_retir('top', 'right')
            },
            err => {
              console.log(err);
               this.Notification_echec_retir('top', 'right')
            })

            console.log(this._OperationModelADD)
            this._OperationService.AddOperation(this._OperationModelADD)
            .subscribe(
              res => {
                console.log(res);
                this.getop();
              },
              err => {
                console.log(err);
              })
        } else {
            // solde insuffisant
             this.Notification_solde_insuff('top', 'right')
          }

      }
     this.RIBFormControlretir.setValue('')
     this.MontantFormControlretir.setValue('')
    } else {
 this.Notification_echec_Solde('top', 'right')
    }
    }


    validerTransfert() {
      this.getop();
      if (this._CompteModel.codeCompte ===  undefined) {
        console.log('erreur');
        this.Notification_RIB_incorrect('top', 'right')
      } else {
        const montant = parseFloat(this.MontantFormControltrans.value)
        if (montant <= this.AncienSoldeEmmet) {
          const nvSoldeEmmet = this.AncienSoldeEmmet - montant
          const nvSoldeBenif = this.AncienSoldeBenif + montant

          this._CompteModel.solde = nvSoldeEmmet
          this._CompteModelBenif.solde = nvSoldeBenif

          this._OperationModelADD.montant = montant
          this._OperationModelADD.soldeNv = nvSoldeEmmet
          this._OperationModelADD.ancienSolde = this.AncienSoldeEmmet

//  ancien et nv solde de l'emmetteur et le beneficiaire
          this._OperationModelADD.ancienSoldeDeb = this.AncienSoldeEmmet
          this._OperationModelADD.ancienSoldeCred = this.AncienSoldeBenif
          this._OperationModelADD.nvSoldeCred = nvSoldeBenif
          this._OperationModelADD.nvSoldeDeb = nvSoldeEmmet

          console.log(this._OperationModelADD)
          console.log(this._CompteModel.solde)
          // update compte emmetteur
          this._CompteService.updateCompte(this._CompteModel)
          .subscribe(
            res => {
              console.log(res);
               this.Notification_succes_transfert('top', 'right')
            },
            err => {
              console.log(err);
               this.Notification_echec_transfert('top', 'right')
            })

           // update compte beneficiaire
            this._CompteService.updateCompte(this._CompteModelBenif)
          .subscribe(
            res => {
              console.log(res);
              this.Notification_succes_transfert1('top', 'right')
            },
            err => {
              console.log(err);
              this.Notification_echec_transfert1('top', 'right')
            })

            console.log(this._OperationModelADD)
            this._OperationService.AddOperation(this._OperationModelADD)
            .subscribe(
              res => {
                console.log(res);
                this.getop();
              },
              err => {
                console.log(err);
              })
        } else {
             // solde insuffisant
          this.Notification_solde_insuff('top', 'right')
        }

      }
     this.RIBFormControltrans.setValue('')
     this.MontantFormControltrans.setValue('')
     this.CPTBenFormControltrans.setValue('')
    }



    AnnulerVirement() {
      this.RIBFormControl.setValue('');
      this.MontantFormControl.setValue('');
    }

    AnnulerRetirement() {
      this.RIBFormControlretir.setValue('');
      this.MontantFormControlretir.setValue('');
    }

    AnnulerTransfert() {
      this.RIBFormControltrans.setValue('');
      this.CPTBenFormControltrans.setValue('');
      this.MontantFormControltrans.setValue('');
    }



  // Notification_RIB_incorrect(from, align) {
  //   this.toastr.warning('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> <b> RIB</b> incorrect', '', {
  //     disableTimeOut: true,
  //     closeButton: true,
  //     enableHtml: true,
  //     toastClass: 'alert alert-warning alert-with-icon',
  //     positionClass: 'toast-' + from + '-' +  align
  //   });
  // }
  Notification_RIB_incorrect(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    const color = Math.floor((Math.random() * 4) + 1);
    $.notify({
        icon: 'notifications',
        message: '<b> RIB</b> incorrect .'
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

  // Notification_solde_insuff(from, align) {
  //   this.toastr.warning('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Votre solde est insuffisant', '', {
  //     disableTimeOut: true,
  //     closeButton: true,
  //     enableHtml: true,
  //     toastClass: 'alert alert-warning alert-with-icon',
  //     positionClass: 'toast-' + from + '-' +  align
  //   });
  // }
  Notification_solde_insuff(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    const color = Math.floor((Math.random() * 4) + 1);
    $.notify({
        icon: 'notifications',
        message: 'Votre solde est insuffisant.'
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

  // Notification_succes_virement(from, align) {
  //   this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>  Montant virer avec <b>succès</b>', '', {
  //     disableTimeOut: true,
  //     closeButton: true,
  //     enableHtml: true,
  //     toastClass: 'alert alert-success alert-with-icon',
  //     positionClass: 'toast-' + from + '-' +  align
  //   });
  // }
  Notification_succes_virement(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    const color = Math.floor((Math.random() * 4) + 1);
    $.notify({
        icon: 'notifications',
        message: ' Montant virer avec <b>succès</b>.'
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

  //   Notification_echec_virement(from, align){
  //    this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>   <b>echec</b> de virement... reessayez', '', {
  //       disableTimeOut: true,
  //       closeButton: true,
  //       enableHtml: true,
  //       toastClass: 'alert alert-danger alert-with-icon',
  //       positionClass: 'toast-' + from + '-' +  align
  //     });
  // }
  Notification_echec_virement(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    const color = Math.floor((Math.random() * 4) + 1);
    $.notify({
        icon: 'notifications',
        message: ' <b>echec</b> de virement... ressayez.'
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

  // Notification_succes_retir(from, align) {
  //   this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>  Montant retirer avec <b>succès</b>', '', {
  //     disableTimeOut: true,
  //     closeButton: true,
  //     enableHtml: true,
  //     toastClass: 'alert alert-success alert-with-icon"',
  //     positionClass: 'toast-' + from + '-' +  align
  //   });
  // }
  Notification_succes_retir(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    const color = Math.floor((Math.random() * 4) + 1);
    $.notify({
        icon: 'notifications',
        message: 'Montant retirer avec <b>succès</b>.'
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

  //   Notification_echec_retir(from, align){
  //     this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>   <b>echec</b> de retrait... reessayez', '', {
  //       disableTimeOut: true,
  //       closeButton: true,
  //       enableHtml: true,
  //       toastClass: 'alert alert-danger alert-with-icon',
  //       positionClass: 'toast-' + from + '-' +  align
  //     });
  // }
  Notification_echec_retir(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    const color = Math.floor((Math.random() * 4) + 1);
    $.notify({
        icon: 'notifications',
        message: ' <b>echec</b> de retrait... ressayez.'
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

  // Notification_succes_transfert(from, align) {
  //  this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>  Montant transferer avec <b>succès</b> ', '', {
  //     disableTimeOut: true,
  //     closeButton: true,
  //     enableHtml: true,
  //     toastClass: 'alert alert-success alert-with-icon"',
  //     positionClass: 'toast-' + from + '-' +  align
  //   });
  // }

  Notification_succes_transfert(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    const color = Math.floor((Math.random() * 4) + 1);
    $.notify({
        icon: 'notifications',
        message: '  Montant transferer avec <b>succès</b>.'
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

  //   Notification_echec_transfert(from, align){
  //   this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>   <b>echec</b> de transfert... reessayez', '', {
  //       disableTimeOut: true,
  //       closeButton: true,
  //       enableHtml: true,
  //       toastClass: 'alert alert-danger alert-with-icon',
  //       positionClass: 'toast-' + from + '-' +  align
  //     });
  // }

  Notification_echec_transfert(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    const color = Math.floor((Math.random() * 4) + 1);
    $.notify({
        icon: 'notifications',
        message: ' <b>echec</b> de transfert... reessayez.'
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

  // Notification_succes_transfert1(from, align) {
  //   this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>  Montant reçu  avec <b>succès</b> ', '', {
  //     disableTimeOut: true,
  //     closeButton: true,
  //     enableHtml: true,
  //     toastClass: 'alert alert-success alert-with-icon"',
  //     positionClass: 'toast-' + from + '-' +  align
  //   });
  // }

  Notification_succes_transfert1(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    const color = Math.floor((Math.random() * 4) + 1);
    $.notify({
        icon: 'notifications',
        message: ' Montant reçu  avec <b>succès</b>.'
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

  //   Notification_echec_transfert1(from, align){
//   this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>
// <b>echec</b> Montant non reçu ... reessayez', '', {
  //       disableTimeOut: true,
  //       closeButton: true,
  //       enableHtml: true,
  //       toastClass: 'alert alert-danger alert-with-icon',
  //       positionClass: 'toast-' + from + '-' +  align
  //     });
  // }
  Notification_echec_transfert1(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    const color = Math.floor((Math.random() * 4) + 1);
    $.notify({
        icon: 'notifications',
        message: '<b>echec</b> Montant non reçu ... ressayez.'
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

// Notification_echec_Solde(from, align) {
// this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> le montant doit étre <b>numérique</b>', '', {
//   disableTimeOut: true,
//   enableHtml: true,
//   closeButton: true,
//   toastClass: 'alert alert-danger alert-with-icon',
//   positionClass: 'toast-' + from + '-' +  align
// });
// }


Notification_echec_Solde(from, align) {
  const type = ['', 'info', 'success', 'warning', 'danger'];
  const color = Math.floor((Math.random() * 4) + 1);
  $.notify({
      icon: 'notifications',
      message: 'le montant doit étre <b>numérique</b>.'
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
