import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { cleanData } from '../../../../utils/utils';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
@Component({
  selector: 'app-finish-flow',
  templateUrl: './finish-flow.component.html',
  styleUrls: ['./finish-flow.component.scss']
})
export class FinishFlowComponent implements OnInit {

  message: string;
  isOk: boolean;
  title: string;
  loading: boolean =false ;
  clientePref: any = false;
  cupo10:any = false;
  userData;
  ccType
  cupo
  documentTypes: Array<any> = [
    {
      Id: '1',
      Descripcion: 'Cédula de ciudadanía',
    },
    {
      Id: '2',
      Descripcion: 'Cédula de extranjería',
    },
    {
      Id: '3',
      Descripcion: 'NIT',
    }
  ];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private snackBar: MatSnackBar,
  ) {
    this.message = this.route.snapshot.queryParams.message;
    this.title = this.route.snapshot.queryParams.title;
    this.isOk = history?.state?.data?.isOk || false;
  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.clientePref = this.userData.ClientePreferencial;
    this.ccType = this.documentTypes.find(key => key.Id == this.userData.IdTipoIdentificacion).Descripcion;

    this.cupo = parseInt(this.userData.Cupo);
    if(this.cupo > 9999999)
    {
      this.cupo10 = true;
    }
    registerLocaleData(es);
  }

  async goHome(): Promise<void> {
    this.cleanData();
    await this.router.navigate(['/funnel/agent-home']);
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  private cleanData(): void {
    cleanData();
  }
  sendOkCompra(): void {
    let formData =  {
      "IdConsulta": this.userData.IdConsulta,
      "AceptaComprar": 1
  }
  this.loading = true;
    this.dataService.okCompra(formData).subscribe(async (response: any) => {

      if (response.IdError === 0) {
        //localStorage.setItem('userData', JSON.stringify(response));
        //this.loading = false;
        //await this.router.navigateByUrl('simulation');
        if (response.IdEstado == 1.1)
        {
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
          await this.router.navigateByUrl('face-detector-presentation');
        }
        else
        {
          this.openSnackBar(response.Mensaje, 'Cerrar');
          this.loading = false;
        }
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
      }
    });
  }
}
