import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-rejectpayment',
  templateUrl: './rejectpayment.component.html',
  styleUrls: ['./rejectpayment.component.scss']
})
export class RejectpaymentComponent implements OnInit {

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

    this.dataService.enviarDocs(formData).subscribe(async (response: any) => {
      if (response.IdError === 0) {
        this.loading = false;
        if (response.IdEstado == 9) {
          await this.router.navigateByUrl('/funnel/validate-docs');
        } else {
          if(response.IdEstado == 98){
            await this.router.navigateByUrl('/funnel/reject');
          }else{
            this.openSnackBar(response.Mensaje, 'Cerrar');
          }
        }
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
      }
    });
  }

}
