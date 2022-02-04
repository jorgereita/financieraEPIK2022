import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
@Component({
  selector: 'app-report-fga',
  templateUrl: './report-fga.component.html',
  styleUrls: ['./report-fga.component.scss']
})
export class ReportFgaComponent implements OnInit {
  loading = false
  listaCreditos
  imageSrc = "assets/img/default-user.png";
  actualItem
  filterList
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    public dialogo: MatDialog,
    private snackBar: MatSnackBar) {
    this.dataService.catalogos().subscribe(data => {
      if (data.IdError == 0) {
        for (var e in data.Lista) {
          // if (data.Lista[e].TipoCatalogo === "Ocupacion") {
          //   this.occupationList = data.Lista[e].Catalago;
          // }

        }
      }
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  getUsers() {
    this.loading = true;
    this.dataService.getFgaList().subscribe(async (response: any) => {
      this.loading = false;
      if (response) {
        this.listaCreditos = response.lstDatosClientes;
        this.filterList = response.lstDatosClientes;
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');

      }
    });
  }
  ngOnInit(): void {
    registerLocaleData(es);
    this.getUsers();
  }
  getItems(ev) {
    let val = ev.target.value;
    let userForFilter = [];
    let data = this.listaCreditos;
    for (let e in data) {
      if ((data[e].Documento.toLowerCase().includes(val.toLowerCase())) || (data[e].NumeroTransaccion.toLowerCase().includes(val.toLowerCase()))) {
        userForFilter.push(data[e])
      }
    }
    this.filterList = userForFilter;
  }
  openPopUp(item, mode) {
    this.actualItem = item;
    this.dialogo.open(PopUpConfirmReportComponent, {
      width: '100vw',
      height: '80vh',
      data: { item, mode }
    }).afterClosed()
      .subscribe((data) => {
        if (data) {
          this.getUsers();

        } else {

        }
      });
  }
}
// ------------------------- Popup confirm report -----------------
@Component({
  selector: 'app-pop-up-confirm-report',
  templateUrl: 'popup-confirm-report.html',
  styleUrls: ['./report-fga.component.scss']
})
export class PopUpConfirmReportComponent implements OnInit {


  loading = false;
  reason = ""
  public webcamImage1: string = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<PopUpConfirmReportComponent>, private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private dataService: DataService) {

  }
  ngOnInit() {

    // this.cargarDatosLista();
    this.data
  }

  cancel() {
    this.dialogRef.close(false);
  }
  reloadReports(response) {
    this.dialogRef.close(response);
  }
  sendReport() {
    this.loading = true;
    let data = {
      "IdCotizacion": this.data.item.IdCotizacion,
      "SeleccionAccion": this.data.mode,
      "Motivo": this.reason
    }
    this.dataService.sendFgaReport(data).subscribe(async (response: any) => {
      this.loading = false;
      if (response) {
        if(this.data.mode=="2"){this.reason = ""}
        this.reloadReports(response);
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
      }
    });
  }
 
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }


}
