import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { NgIf, registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  data: any;
  showSender = false;
  loading = false;

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.data = JSON.parse(localStorage.getItem('userDataResm'));
    //debugger;

    if (this.data != null && this.data.Cupo != null)
      this.data.Cupo = parseFloat(this.data.Cupo);

    if (this.data != null && this.data.Cuota != null)
      this.data.Cuota = parseFloat(this.data.Cuota);

    if (this.data != null && this.data.Valor != null)
      this.data.Valor = parseFloat(this.data.Valor);
  }

  ngOnInit(): void {
    registerLocaleData(es);
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  sendMatDoc(flow: number) {
    let formData = {
      "NumeroIdentificacion": this.data.NumeroIdentificacion ? this.data.NumeroIdentificacion : localStorage.getItem('NumeroDocumento'),
      "NumeroAutorizacion": this.data.NumeroAutorizacion,
      "Flujo": flow
    }
    this.loading = true;
    this.dataService.selecFlujo(formData).subscribe(async (response: any) => {
      this.loading = false;
      if (response.IdError === 0) {

        if(response.IdEstado=="2"){
          this.router.navigateByUrl('/funnel/simulation');
        }
        if(response.IdEstado=="4"){
          this.router.navigateByUrl('face-detector-presentation');
        }
        if(response.IdEstado=="7"){
          localStorage.setItem('InfoAccountsOutLay', JSON.stringify(response));
          this.router.navigateByUrl('/funnel/add-accounts');
        }
        if(response.IdEstado=="8"){
          localStorage.setItem('InfoAccounts', JSON.stringify(response));
          this.router.navigateByUrl('/funnel/new-acc-flowpay');
        }
        
        // if (response.IdEstado == 8) {
        //   await this.router.navigateByUrl('/funnel/documents');
        // } else {
        //   if(response.IdEstado == 98){
        //     await this.router.navigateByUrl('/funnel/reject');
        //   }else{
        //     this.openSnackBar(response.Mensaje, 'Cerrar');
        //   }
        // }
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
      }
    });
  }

}
