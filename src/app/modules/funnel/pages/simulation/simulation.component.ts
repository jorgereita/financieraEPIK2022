import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { DetailpaymentComponent } from '../detailpayment/detailpayment.component';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit {
  amountForm: FormGroup;
  calcform: FormGroup;
  terms: Array<any> = [
    {
      Id: 1,
      Descripcion: '6 meses',
    },
    {
      Id: 2,
      Descripcion: '12 meses',
    },
    {
      Id: 3,
      Descripcion: '18 meses',
    },
    {
      Id: 4,
      Descripcion: '24 meses',
    },
    {
      Id: 5,
      Descripcion: '36 meses',
    },
    {
      Id: 6,
      Descripcion: '48 meses',
    },
    {
      Id: 7,
      Descripcion: '60 meses',
    },
  ];
  ciclosFac = [{ FechaFacturacion: '', IdCicloFacturacion: '' }];
  RespuestaSimulaciones = [{ IdSimulador: '', SimuladortTexto: '', Plazo: '', ValorCuota: '', AhorroCuota: '' }]
  loading = false;
  data: any;
  panelOpenState = false;
  seePlan = false;
  quotes: Array<any>;
  payout: any;
  income: any;
  mensajeInteres: any;
  availableAmount = 0;
  Cuotas
  showDetails = false;
  sliderMin = 1000000
  sliderMax = 1000001

  plazoMin = 6;
  plazoMax = 48;
  allQuote
  gridsize: number = 30;
  clientePref
  updateSetting(event) {
    this.gridsize = event.value;
  }
  sliderDates: number = 6;
  updateDates(event) {
    this.sliderDates = event.value;
  }
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dataService: DataService,
    public dialogo: MatDialog,
    private sanitizer: DomSanitizer
  ) {
    this.data = JSON.parse(localStorage.getItem('userData'));
    this.payout = this.route.snapshot.queryParams.payout || null;
    this.income = this.route.snapshot.queryParams.income || null;
    this.availableAmount = parseInt(this.data.Cupo);
    this.clientePref = this.data.ClientePreferencial;
    // this.availableAmount =100000000;
    this.calcform = this.formBuilder.group({
      // Cuotas: new FormControl('', Validators.required),
      Tiempo: ['', [Validators.required,]],
    });
    this.amountForm = this.formBuilder.group({
      // Monto: [this.availableAmount, [Validators.required, Validators.min(400000), Validators.max(this.availableAmount)]],
      Meses: [6, [Validators.required, Validators.min(this.plazoMin), Validators.max(this.plazoMax)]],
    });
  }
  triggerCalc(value) {
    this.calcCouta(value);
  }
  ngOnInit(): void {
    registerLocaleData(es);
    this.sliderMax = this.availableAmount;
    this.calcCouta(this.sliderMin);
  }
  getQuote() {
    let arr = this.RespuestaSimulaciones.find(key => key.Plazo == this.amountForm.value.Meses)
    if (arr) {
      this.Cuotas = arr.IdSimulador;
      return arr.ValorCuota;
    } else {
      return 0
    }
  }
  getSave() {
    let arr = this.RespuestaSimulaciones.find(key => key.Plazo == this.amountForm.value.Meses)
    if (arr) {
      return arr.AhorroCuota;
    } else {
      return 0
    }
  }
  sliderOnChangeMont(value: number) {
    // this.sliderDates = value;
    if (value == 30) {
      this.amountForm.controls['Meses'].setValue(36);
    }
    if (value == 42) {
      this.amountForm.controls['Meses'].setValue(48);
    }
  }
  sliderOnChange(value: number) {
    if (value) {
      this.amountForm.controls['Monto'].setValue(value);
      // this.calcCouta();
    }
  }
  resetVal() {
    this.showDetails = false;
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  onInputChange($event: any): void {
    setTimeout(() => {
      let amoung = parseInt(($event.target.value).replaceAll(".", ""));
      if (amoung >= 1000000) {
        if (amoung > this.sliderMax) {
          amoung = this.sliderMax;
          this.gridsize = this.sliderMax;
          (<HTMLInputElement>document.getElementById("input-amount")).value = this.addDecimalPoints(this.sliderMax.toString())
          this.openSnackBar("Valor supera cupo aprobado.", 'Cerrar');
          return;
        }
        this.calcCouta(amoung);
      }

    }, 100);
  }
  addDecimalPoints(id) {
    let inputValue = id.replace('.', '').split("").reverse().join(""); // reverse
    let newValue = '';
    for (let i = 0; i < inputValue.length; i++) {
      if (i % 3 == 0) {
        newValue += '.';
      }
      newValue += inputValue[i];
    }
    var inst = newValue.split("").reverse().join("")
    if (inst[inst.length-1] == ".") {
      inst = inst.slice(0, -1)
    }
    return inst
  }
  onInputChangeMonth($event: any): void {
    setTimeout(() => {
      this.amountForm.controls['Meses'].setValue(parseInt(($event.target.value).replaceAll(".", "")));
    }, 100);
  }
  async calcCouta(value): Promise<void> {
    this.loading = true;
    let formData = {
      "NumeroIdentificacion": this.data.NumeroIdentificacion ? this.data.NumeroIdentificacion : localStorage.getItem('NumeroDocumento'),
      "NumeroAutorizacion": this.data.NumeroAutorizacion ? this.data.NumeroAutorizacion : localStorage.getItem('NumeroAutorizacion'),
      "CupoSolicitado": value
    };

    this.dataService.cotizadorV2(formData).subscribe(async (response: any) => {
      if (response.IdError === 0) {
        this.showDetails = true;
        this.ciclosFac = _.orderBy(response.CiclosFacturacion, ['IdCicloFacturacion'], ['desc']);
        this.RespuestaSimulaciones = response.RespuestaSimulaciones;
        this.mensajeInteres = response.MensajeInformacionCredito;
        this.loading = false;
        this.allQuote = response;
      } else {
        this.RespuestaSimulaciones = [{ IdSimulador: '', SimuladortTexto: '', Plazo: '', ValorCuota: '', AhorroCuota: '' }]
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
        this.showDetails = false;
      }
    });
  }
  goDates() {
    if (this.allQuote?.ClienteReCompra) {
      this.sendDataPayment();
    } else {
      let item = {
        cotizadorData: this.allQuote,
        selectDate: this.amountForm.value.Meses
      }
      localStorage.setItem("dataSimulacion", JSON.stringify(item));
      this.router.navigateByUrl('/funnel/payment-dates');
    }
 
  }
  sendDataPayment(): void {

    const formData =
    {
      "NumeroIdentificacion": this.data.NumeroIdentificacion ? this.data.NumeroIdentificacion : localStorage.getItem('NumeroDocumento'),
      "NumeroAutorizacion": this.data.NumeroAutorizacion ? this.data.NumeroAutorizacion : localStorage.getItem('NumeroAutorizacion'),
      "IdSimulador": this.Cuotas,
      "IdCicloFacturacion": 0
    }

    this.loading = true;
    this.dataService.selecCredito(formData).subscribe(async (response: any) => {
      this.loading = true;
      if (response.IdError === 0) {
        localStorage.setItem("userDataResm", JSON.stringify(response));
        this.router.navigateByUrl('/funnel/status');
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
      }
    });
  }
  async sendCouta(): Promise<void> {
    this.loading = true;
    let formData = {
      "NumeroIdentificacion": this.data.NumeroIdentificacion ? this.data.NumeroIdentificacion : localStorage.getItem('NumeroDocumento'),
      "NumeroAutorizacion": this.data.NumeroAutorizacion ? this.data.NumeroAutorizacion : localStorage.getItem('NumeroAutorizacion'),
      "IdSimulador": this.Cuotas,
      "IdCicloFacturacion": this.amountForm.value.Meses
    }

    this.dataService.guardarSimulacion(formData).subscribe(async (response: any) => {
      //debugger;
      if (response.IdError === 0) {
        if (response.IdEstado == 4) {
          this.loading = false;
          await this.router.navigateByUrl('/funnel/whatsappquote');
        } else {
          if (response.IdEstado == 98) {
            this.loading = false;
            await this.router.navigateByUrl('/funnel/reject');
          } else {
            this.loading = false;
            this.openSnackBar(response.Mensaje, 'Cerrar');
          }
        }
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
      }
    });
  }
  getDay() {
    const date = this.ciclosFac.find(e => e.IdCicloFacturacion == this.calcform.value.Tiempo)?.FechaFacturacion
    return date.split("-")[2]
  }
  async sendViaWapp(): Promise<void> {
    this.loading = true;
    localStorage.setItem('requestMoney', this.amountForm.value.Monto);
    await this.router.navigateByUrl('/funnel/choose-amount');
    this.loading = false;
  }

  async finish(): Promise<void> {
    await this.router.navigate(['/funnel/finish-flow'], { queryParams: { message: 'Proceso finalizado por el cliente' }, state: { data: { isOk: false, } } });
  }

  openPopUpDetail() {
    this.dialogo.open(DetailpaymentComponent, {
      width: '100vw',
      height: '50vh',
      data: this.allQuote?.detalleCompraResCotizador
    }).afterClosed()
      .subscribe((data) => {
        if (data.IdBanco) {
          // this.continue(data, true);
        } else {
        }
      });
  }
}