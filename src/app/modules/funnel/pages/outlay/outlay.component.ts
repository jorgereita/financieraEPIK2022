import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-outlay',
  templateUrl: './outlay.component.html',
  styleUrls: ['./outlay.component.scss']
})
export class OutlayComponent implements OnInit {

  loading = false;
  selected: string;
  addAccountForm: FormGroup;
  objDatosCuentas = []

  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    public dialogo: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.data = JSON.parse(localStorage.getItem('userData'));
    this.objDatosCuentas = JSON.parse(localStorage.getItem('InfoAccountsOutLay'))?.lstDatosCuentaCompra;

    this.addAccountForm = this.formBuilder.group({
      Fecha: ['5', [Validators.required]],
    });

  }
  getNumber(account) {
    return account.slice(account.length - 4, account.length)
  }
  ngOnInit(): void {
    //        this.objDatosCuentas.push( {
    //       "IdDatoCuenta":31,
    //       "TipoCuenta":"CuentaAhorro",
    //       "NumeroCuenta":"060036492",
    //       "Entidad":"B. FALABELLA   AHORROS"
    //    })
    //    this.objDatosCuentas.push( {
    //     "IdDatoCuenta":30,
    //     "TipoCuenta":"CuentaAhorro",
    //     "NumeroCuenta":"060036492",
    //     "Entidad":"B. FALABELLA   AHORROS"
    //  })
  }



  sendData(): void {
    this.sendWithNewAccount("", false)
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  async sendWithNewAccount(newAcc, newacc): Promise<void> {
    let formData
    if (newacc) {
      formData = {
        "NumeroIdentificacion": this.data.NumeroIdentificacion ? this.data.NumeroIdentificacion : localStorage.getItem('NumeroDocumento'),
        "NumeroAutorizacion": this.data.NumeroAutorizacion  ? this.data.NumeroAutorizacion : localStorage.getItem('NumeroAutorizacion'),
        "IdDatoCuenta": 0,
        "ObjDatosDesembolso": {
          "TipoCuenta": newAcc.IdTipoBanco,
          "NumeroCuenta": newAcc.NumeroCuenta,
          "Entidad": newAcc.IdBanco,
        }

      }
    } else {
      formData = {
        "NumeroIdentificacion": this.data.NumeroIdentificacion ? this.data.NumeroIdentificacion : localStorage.getItem('NumeroDocumento'),
        "NumeroAutorizacion": this.data.NumeroAutorizacion  ? this.data.NumeroAutorizacion : localStorage.getItem('NumeroAutorizacion'),
        "IdDatoCuenta": this.selected,
        "ObjDatosDesembolso": null
      }
    }


    this.loading = true;
    this.dataService.guardarInfoDesembolso(formData).subscribe(async (response: any) => {
     //debugger;
      if (response.IdError === 0) {
        this.loading = false;
        if (response.IdEstado == 6) {
          // localStorage.setItem('userData', JSON.stringify(response));
          // await this.router.navigateByUrl('/funnel/status');
          localStorage.setItem('InfoAccounts', JSON.stringify(response));
          await this.router.navigateByUrl('/funnel/add-accounts');
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
  openPopUp() {
    // this.actualItem = item;
    this.dialogo.open(OutlayNewComponent, {
      width: '100vw',
      height: '80vh',

    }).afterClosed()
      .subscribe((data) => {
        if (data.IdBanco) {
          this.sendWithNewAccount(data, true);
        } else {
        }
      });
  }
}



@Component({
  selector: 'app-outlaynew',
  templateUrl: 'outlay-new.html',
  styleUrls: ['./outlay.component.scss']
})
export class OutlayNewComponent implements OnInit {


  load = false;
  loading = false;
  tipoBanco: Array<any>;
  listaBancos: Array<any>;
  additionalDataForm: FormGroup;
  public webcamImage1: string = null;
  constructor(
    public dialogRef: MatDialogRef<OutlayNewComponent>, private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private dataService: DataService) {
    this.loadData();
    this.additionalDataForm = this.formBuilder.group({
      NumeroCuenta: ['', [Validators.required, Validators.pattern('^[0-9].{9,11}$')]],
      IdBanco: ['', Validators.required],
      IdTipoBanco: ['', Validators.required],
    });
  }
  ngOnInit() {
    // this.cargarDatosLista();

  }
  loadData(): void {
    this.loading = true;
    this.dataService.catalogos().subscribe(data => {
      this.loading = false;
      if (data.IdError == 0) {
        for (var e in data.Lista) {

          if (data.Lista[e].TipoCatalogo === "Tipo Cuenta Banco") {
            this.tipoBanco = data.Lista[e].Catalago;
          }
          if (data.Lista[e].TipoCatalogo === "Bancos") {
            this.listaBancos = data.Lista[e].Catalago;
          }

        }
      }
    });
  }
  sendDataPop() {
    this.dialogRef.close(this.additionalDataForm.value);
  }

  cancelarPop() {
    this.dialogRef.close({ "IdBanco": false });
  }
  activarLoad() {

    document.getElementById("fileInputC1").click();
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
  allowNumbersfilter(event)
  { 
     var k;  
     k = event.charCode;
     
     let lng=this.additionalDataForm.value.NumeroCuenta?.toString()
     if(lng?.length>11 ||(  this.additionalDataForm.value.NumeroCuenta==0 && k==48)) {
       return false
     }
     let keychar = String.fromCharCode(k);
     if(keychar == "."){
      return false
     }
     return( k == 8  || (k >= 48 && k <= 57)); 
  }


}
