import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-new-acc-flowpay',
  templateUrl: './new-acc-flowpay.component.html',
  styleUrls: ['./new-acc-flowpay.component.scss']
})
export class NewAccFlowpayComponent implements OnInit {


  load = false;
  loading = false;
  previosData
  tipoBanco: Array<any>;
  listaBancos: Array<any>;
  additionalDataForm: FormGroup;
  public webcamImage1: string = null;
  constructor(
    private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private dataService: DataService) {
    this.loadData();
    this.additionalDataForm = this.formBuilder.group({
      NumeroCuenta: ['', [Validators.required, Validators.pattern('^[0-9].{9,11}$')]],
      IdBanco: ['', Validators.required],
      IdTipoBanco: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.previosData = localStorage.getItem("dataFormAccounts") ? JSON.parse(localStorage.getItem("dataFormAccounts")) : null;
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

    const formData = {
      "NumeroIdentificacion": localStorage.getItem('NumeroDocumento'),
      "NumeroAutorizacion": localStorage.getItem('NumeroAutorizacion'),
      "IdDatoCuenta": 0,
      // "CuentaDiferenteRecaudo": this.previosData ? this.previosData.checkDiffDeb == "true" ? 1 : 2 : 1,
      "ObjDatosDesembolso": {
        "TipoCuenta": this.additionalDataForm.value.IdTipoBanco,
        "NumeroCuenta": this.additionalDataForm.value.NumeroCuenta,
        "Entidad": this.additionalDataForm.value.IdBanco,
      }
    };
    this.loading = true;
    this.dataService.addAccountRecaudo(formData).subscribe(async (response: any) => {
      this.loading = false;
      if (response.IdError === 0) {
        localStorage.setItem('userDataTemp', JSON.stringify(formData));
        // await this.router.navigateByUrl('/funnel/biometric');
        if(response.IdEstado=="8"){
          this.router.navigateByUrl('/funnel/new-acc-flowpay');
        }
        
        if(response.IdEstado=="8.1"){
          this.router.navigateByUrl('/funnel/new-acc-flowpay');
        }
        
        if(response.IdEstado=="9"){
          this.router.navigateByUrl('/funnel/validate-docs');
        }
        
        if(response.IdEstado=="98"){
          this.router.navigateByUrl('/funnel/reject');
        }
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
      }
    });
  }

  cancelarPop() {

  }
  activarLoad() {

    document.getElementById("fileInputC1").click();
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
  allowNumbersfilter(event) {
    var k;
    k = event.charCode;

    let lng = this.additionalDataForm.value.NumeroCuenta?.toString()
    if (lng?.length > 11 || (this.additionalDataForm.value.NumeroCuenta == 0 && k == 48)) {
      return false
    }
    let keychar = String.fromCharCode(k);
    if (keychar == ".") {
      return false
    }
    return (k == 8 || (k >= 48 && k <= 57));
  }

}
