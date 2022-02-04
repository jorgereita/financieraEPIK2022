import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DataService} from '../../../../services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-birth',
  templateUrl: './birth.component.html',
  styleUrls: ['./birth.component.scss']
})
export class BirthComponent implements OnInit {
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

    this.dataService.verificarPagare(formData).subscribe(async (response: any) => {
      //debugger;
      if (response.IdError === 0) {
        this.loading = false;
        if (response.IdEstado == 12) {
          localStorage.setItem('dataCreditOk', JSON.stringify(response));
          await this.router.navigateByUrl('/funnel/success');
          // this.router.navigateByUrl(`/funnel/success/${true}`);
        } else {
          this.openSnackBar(response.Mensaje, 'Cerrar');
          await this.router.navigateByUrl('/funnel/reject-payment');
        }
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
      }
    });
  }


}
