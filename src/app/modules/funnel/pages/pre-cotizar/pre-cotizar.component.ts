import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { screens } from 'src/app/utils/screens';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import * as _ from 'lodash';
import { allowChars, allowNumbers } from 'src/app/services/utils';
import { MatDialog } from '@angular/material/dialog';
import { DetailpaymentComponent } from '../detailpayment/detailpayment.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-pre-cotizar',
  templateUrl: './pre-cotizar.component.html',
  styleUrls: ['./pre-cotizar.component.scss']
})
export class PreCotizarComponent implements OnInit {


  basicDataForm: FormGroup;
  personalInfoForm: FormGroup;
  simulationList;
  sliderMin = 1000000
  sliderMax = 15000000
  CuotasLista6: { Cuota1: 0, Cuota13: 0 };
  CuotasLista12: { Cuota1: 0, Cuota13: 0 };
  CuotasLista18: { Cuota1: 0, Cuota13: 0 };
  CuotasLista24: { Cuota1: 0, Cuota13: 0 };
  CuotasLista36: { Cuota1: 0, Cuota13: 0 };
  CuotasLista48: { Cuota1: 0, Cuota13: 0 };
  infoCredito
  loading = false;
  firstPart = true;
  slideOnvalue = 0;
  gridsize: number = 30;
  fullValue
  updateSetting(event) {
    this.gridsize = event.value;
    this.slideOnvalue=event.value;
  }
  bussinessName = environment.bussinessName
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    public dialogo: MatDialog,
  ) {
    this.basicDataForm = this.formBuilder.group({
      NumeroIdentificacion: ['',],
      ValorCotizar: ['', [Validators.required, Validators.min(this.sliderMin)]],
    });
  }
  onInputChange($event: any): void {
    setTimeout(() => { 
      // this.basicDataForm.setValue({
      //   ValorCotizar: parseInt(($event.target.value).replaceAll(".", "")),
      //   NumeroIdentificacion: this.basicDataForm.value.NumeroIdentificacion
      // });
      this.gridsize=parseInt(($event.target.value).replaceAll(".", ""))
    }, 100);
  }
  sliderOnChangeMont(value: number) {
    this.basicDataForm.controls['ValorCotizar'].setValue(value);
    this.slideOnvalue = value
  }
  
  allowNumbersfilter(event) {
    var k;
    k = event.charCode;
    let lng = this.basicDataForm.value.NumeroIdentificacion?.toString()
    if (lng?.length > 10 || (this.basicDataForm.value.NumeroIdentificacion == 0 && k == 48)) {
      return false
    }
    let keychar = String.fromCharCode(k);
    if (keychar == ".") {
      return false
    }
    return (k == 8 || (k >= 48 && k <= 57));
  }
  ngOnInit(): void {
    registerLocaleData(es);
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  sendBasicData(): void {
    this.firstPart = false;
  }
  allowNumberfilter(ev) {
    return allowNumbers(ev);
  }
  sendToCreate() {
    this.router.navigate(['/funnel/initial-query'], { queryParams: { doc: this.basicDataForm.value.NumeroIdentificacion } });
  }
  openPopUpDetail() {
    this.dialogo.open(DetailpaymentComponent, {
      width: '100vw',
      height: '50vh',
      data:this.infoCredito
    }).afterClosed()
      .subscribe((data) => {
        if (data.IdBanco) {
          // this.continue(data, true);
        } else {
        }
      });
  }
  async sendData(value): Promise<void> {
    this.loading = true;
    // Do stuff here
    const formData =  {
      "NumeroIdentificacion":this.basicDataForm.value.NumeroIdentificacion,
      "ValorCotizar":value
    };

    this.dataService.simaladorV2(formData).subscribe(async (response: any) => {
      this.loading = false;
      if (response.IdError === 0) {
        this.fullValue=response;
        this.simulationList = response.RespuestaSimulaciones;
        this.infoCredito = response.detalleResCotizador
        /*
        this.CuotasLista6.Cuota1 = this.simulationList[0].PlanSimulacionPagos[0].ValorTotal;
        this.CuotasLista12.Cuota1 = this.simulationList[1].PlanSimulacionPagos[0].ValorTotal;
        this.CuotasLista18.Cuota1 = this.simulationList[2].PlanSimulacionPagos[0].ValorTotal;
        this.CuotasLista18.Cuota13 = this.simulationList[2].PlanSimulacionPagos[12].ValorTotal;
        this.CuotasLista24.Cuota1 = this.simulationList[3].PlanSimulacionPagos[0].ValorTotal;
        this.CuotasLista24.Cuota13 = this.simulationList[3].PlanSimulacionPagos[12].ValorTotal;
        this.CuotasLista36.Cuota1 = this.simulationList[4].PlanSimulacionPagos[0].ValorTotal; 
        this.CuotasLista36.Cuota13 = this.simulationList[4].PlanSimulacionPagos[12].ValorTotal;
        this.CuotasLista48.Cuota1 = this.simulationList[5].PlanSimulacionPagos[0].ValorTotal; 
        this.CuotasLista48.Cuota13 = this.simulationList[5].PlanSimulacionPagos[12].ValorTotal;
        */

      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
      }
    });
  }

}
