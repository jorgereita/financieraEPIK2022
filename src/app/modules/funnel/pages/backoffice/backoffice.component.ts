import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent implements OnInit {

  resending: boolean;
  times = 0;
  hideConfirmSender: boolean;
  data: any;
  showSender = false;
  loading = false;
  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.data = JSON.parse(localStorage.getItem('userData'));
  }

  ngOnInit(): void {
    setTimeout(() => this.showSender = true, 3000);
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  sendVerificar(): void {
    this.loading = true;
    let formData = {
      "NumeroIdentificacion": this.data.NumeroIdentificacion ? this.data.NumeroIdentificacion : localStorage.getItem('NumeroDocumento'),
      "NumeroAutorizacion": this.data.NumeroAutorizacion,
    }

    this.dataService.verificarBackoffice(formData).subscribe(async (response: any) => {
      this.loading = false;
      if (response.IdError === 0) {

        if(response.IdEstado=="7"){
          await this.router.navigateByUrl('/funnel/add-accounts');
        }
        if(response.IdEstado=="8"){
          await this.router.navigateByUrl('/funnel/new-acc-flowpay');
        }
        if(response.IdEstado=="-2"){
          await this.router.navigateByUrl('/funnel/reject');
        }
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');

      }
    });
  }

}
