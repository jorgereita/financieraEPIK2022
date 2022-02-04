import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { OutlayNewComponent } from '../outlay/outlay.component';

@Component({
  selector: 'app-add-accounts',
  templateUrl: './add-accounts.component.html',
  styleUrls: ['./add-accounts.component.scss']
})
export class AddAccountsComponent implements OnInit {

  loading = false;
  selected: string;
  addAccountForm: FormGroup;
  objDatosCuentas: Array<any> = []
  formAccounts: FormGroup;
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    public dialogo: MatDialog,
  ) {
    this.data = JSON.parse(localStorage.getItem('userData'));
    this.objDatosCuentas = JSON.parse(localStorage.getItem('InfoAccounts'))?.lstDatosCuentaCompra ? JSON.parse(localStorage.getItem('InfoAccounts'))?.lstDatosCuentaCompra : [];
    this.formAccounts = this.formBuilder.group({
      // IdTipoIdentificacion: ['1', [Validators.required]],
      Cuentas: ['', [Validators.required]],
      checkDiffDeb: ['',],
    });
    this.addAccountForm = this.formBuilder.group({
      Fecha: ['5', [Validators.required]],
    });

  }
  getNumber(account) {
    return account.slice(account.length - 4, account.length)
  }
  ngOnInit(): void {
    // this.objDatosCuentas.push({
    //   "IdDatoCuenta": 30,
    //   "TipoCuenta": "CuentaAhorro",
    //   "NumeroCuenta": "060036492",
    //   "Entidad": "B. FALABELLA   AHORROS"
    // })
  }

  async sendData(): Promise<void> {

    // Do stuff here
    let validate = this.formAccounts.value.Cuentas == '-99' ? true : false;
    if(!validate){
      let acc = this.objDatosCuentas.find(key => key.IdDatoCuenta == this.formAccounts.value.Cuentas)
      const formData = {
        "NumeroIdentificacion": localStorage.getItem('NumeroDocumento'),
        "NumeroAutorizacion": localStorage.getItem('NumeroAutorizacion'),
        "IdDatoCuenta": this.formAccounts.value.Cuentas,
        "CuentaDiferenteRecaudo": validate ? true : this.formAccounts.value.checkDiffDeb? true : false,
        "ObjDatosDesembolso": {
          "TipoCuenta": "",
          "NumeroCuenta": "",
          "Entidad": "",
        }
      };
      this.loading = true;
      this.dataService.addAccountFlow(formData).subscribe(async (response: any) => {
        this.loading = false;
        if (response.IdError === 0) {
          if (response.IdEstado == "8") {
            this.router.navigateByUrl('/funnel/new-acc-flowpay');
          }
          if (response.IdEstado == "8.1") {
            this.router.navigateByUrl('/funnel/new-acc-debt');
          }
          if (response.IdEstado == "9") {
            this.router.navigateByUrl('/funnel/validate-docs');
          }
          if (response.IdEstado == "98") {
            this.router.navigateByUrl('/funnel/reject');
          }
        } else {
          this.openSnackBar(response.Mensaje, 'Cerrar');
        }
      });
    }else{
      this.router.navigateByUrl('/funnel/new-acc-debt');
    }
  
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  async continue(): Promise<void> {
    if(this.formAccounts.value.Cuentas=='-98'&&this.formAccounts.value.checkDiffDeb==false){
      this.openSnackBar("Debe seleccionar una opcion para continuar", 'Cerrar');
      return
    }else{
      this.sendData();
    }
  
    // if (this.formAccounts.value.Cuentas == "-99") {
    //   localStorage.setItem("dataFormAccounts", JSON.stringify(this.formAccounts.value));
    //   this.router.navigateByUrl('/funnel/new-acc-debt');
    //   return;
    // } else {

    // }

  }
  async skip(): Promise<void> {

    let formData = {
      "NumeroIdentificacion": this.data.NumeroIdentificacion ? this.data.NumeroIdentificacion : localStorage.getItem('NumeroDocumento'),
      "NumeroAutorizacion": this.data.NumeroAutorizacion ? this.data.NumeroAutorizacion : localStorage.getItem('NumeroAutorizacion'),
      "IdDatoCuenta": 0,
      "ClientePasa": true
    }
    this.loading = true;
    this.dataService.guardarInfoRecaudo(formData).subscribe(async (response: any) => {
      if (response.IdError === 0) {
        this.loading = false;
        if (response.IdEstado == 7) {
          localStorage.setItem('userData', JSON.stringify(response));
          await this.router.navigateByUrl('/funnel/status');
        } else {
          if (response.IdEstado == 98) {
            await this.router.navigateByUrl('/funnel/reject');
          } else {
            this.openSnackBar(response.Mensaje, 'Cerrar');
          }
        }

      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
      }
    });
  }

  // openPopUp() {
  //   // this.actualItem = item;
  //   this.dialogo.open(OutlayNewComponent, {
  //     width: '100vw',
  //     height: '80vh',

  //   }).afterClosed()
  //     .subscribe((data) => {
  //       if (data.IdBanco) {
  //         this.continue(data, true);
  //       } else {
  //       }
  //     });
  // }
}
