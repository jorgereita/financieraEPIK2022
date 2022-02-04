import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { availableAmount } from 'src/app/utils/utils';
import {screens} from '../../../../utils/screens';
import {FormBuilder} from '@angular/forms';
import {DataService} from '../../../../services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
@Component({
  selector: 'app-query-loan-success',
  templateUrl: './query-loan-success.component.html',
  styleUrls: ['./query-loan-success.component.scss']
})
export class QueryLoanSuccessComponent implements OnInit {
  loading: any;
  data: any;
  availableAmount = availableAmount;
  clientePref: any = false;
  clienteMegaBase: any = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
  ) {

    this.data = JSON.parse(localStorage.getItem('userData'));
    this.clientePref = this.data.ClientePreferencial;
    this.clienteMegaBase = this.data?.ClienteMegaBase;
    if (this.data != null && this.data.Cupo != null)
      this.data.Cupo = parseInt(this.data.Cupo);
  }

  ngOnInit(): void {
    registerLocaleData(es);
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  goAddData(){
    this.router.navigate(['/funnel/additional-data'], { queryParams: { step: 1 }, });
  }
  async finishFlow(): Promise<void> {
    await this.router.navigate(['/funnel/finish-flow'], { queryParams: { message: 'El usuario rechazó la solicitud' }, state: { data: { isOk: false, } } });
  }

  async continue(): Promise<void> {
    this.loading = true;
    const formData = {
      IdConsulta: parseInt(localStorage.getItem('IdConsulta'), 10),
      Acepta: true,
    };
    this.dataService.financialUserAgreement(formData).subscribe(async (response: any) => {
      
      if (response.IdError === 0) {
        if (response.IdConsulta!==undefined && response.IdConsulta !== null && response.IdConsulta !== '')
          localStorage.setItem('IdConsulta', response.IdConsulta)
        if (response.IdEstado !==undefined && response.IdEstado !== null && response.IdEstado !== '')
          localStorage.setItem('IdEstado', response.IdEstado);
        if (response.NumeroIdentificacion !==undefined && response.NumeroIdentificacion !== null && response.NumeroIdentificacion !== '')
          localStorage.setItem('NumeroDocumento', response.NumeroIdentificacion);
        if (response.NumeroAutorizacion !==undefined && response.NumeroAutorizacion !== null && response.NumeroAutorizacion !== '')
          localStorage.setItem('NumeroAutorizacion', response.NumeroAutorizacion);
        if (response.clientePref !==undefined && response.clientePref !== null && response.clientePref !== '')
        {
          localStorage.setItem('ClientePreferencial', response.clientePref);
          this.clientePref = true;
        }
          
        this.loading = false;
        await this.router.navigateByUrl(screens[response.IdPantalla]);
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
      }
    });
  }
}
