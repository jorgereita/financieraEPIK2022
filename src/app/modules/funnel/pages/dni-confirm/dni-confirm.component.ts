import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dni-confirm',
  templateUrl: './dni-confirm.component.html',
  styleUrls: ['./dni-confirm.component.scss']
})
export class DniConfirmComponent implements OnInit {
  loading: boolean;
  data: any;

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router,
    ) {
    this.data = JSON.parse(localStorage.getItem('userData'));
   }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  async sendDniConfirm(): Promise<void> {
    this.loading = true;
    const formData = {
      "NumeroIdentificacion": this.data.NumeroIdentificacion ? this.data.NumeroIdentificacion : localStorage.getItem('NumeroDocumento'),
      "NumeroAutorizacion": this.data.NumeroAutorizacion ? this.data.NumeroAutorizacion : localStorage.getItem('NumeroAutorizacion'),
    };
    //debugger;
    this.dataService.saveDniConfirm(formData).subscribe(async (response: any) => {
      //debugger; 
      if (response.IdError === 0) {
        if (response.IdEstado == 2) {
          if (response.IdConsulta!== undefined && response.IdConsulta !== null && response.IdConsulta !== '')
            localStorage.setItem('IdConsulta', response.IdConsulta)
          if (response.IdEstado !== undefined && response.IdEstado !== null && response.IdEstado !== '')
            localStorage.setItem('IdEstado', response.IdEstado);
          if (response.NumeroIdentificacion !== undefined && response.NumeroIdentificacion !== null && response.NumeroIdentificacion !== '')
            localStorage.setItem('NumeroDocumento', response.NumeroIdentificacion);
          if (response.NumeroAutorizacion !== undefined && response.NumeroAutorizacion !== null && response.NumeroAutorizacion !== '')
            localStorage.setItem('NumeroAutorizacion', response.NumeroAutorizacion);
          this.loading = false;
          await this.router.navigateByUrl('simulation');
        }
        else if (response.IdEstado == -2) {
          this.loading = false;
          await this.router.navigateByUrl('reject-facecheck');
        }
        else {
          this.loading = false;
          await this.router.navigateByUrl('reject-facecheck');
        }
      }
      else{
        this.loading = false;
      }
    });
  }

}
