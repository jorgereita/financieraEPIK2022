import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.scss']
})
export class EmailConfirmComponent implements OnInit {
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

  sendVerificar2(): void {
    this.loading = true;
    let formData = {
      "NumeroIdentificacion": this.data.NumeroIdentificacion ? this.data.NumeroIdentificacion : localStorage.getItem('NumeroDocumento'),
      "NumeroAutorizacion": this.data.NumeroAutorizacion ? this.data.NumeroAutorizacion : localStorage.getItem('NumeroAutorizacion'),
    }

    this.dataService.preguntarCuotasWhastapp(formData).subscribe(async (response: any) => {
      // if (response.IdError === 0) {
      //   this.loading = false;
      //   if (response.IdEstado == "5.1") {
      //     localStorage.setItem('InfoAccountsOutLay', JSON.stringify(response));
      //     // await this.router.navigateByUrl('/funnel/add-accounts');
      //     await this.router.navigateByUrl('/funnel/outlay');
      //   } else {
      //     if (response.IdEstado == 2) {
      //       localStorage.setItem('InfoAccounts', JSON.stringify(response));
      //       await this.router.navigateByUrl('/simulation');
      //     } else {
      //       if(response.IdEstado == 98){
      //         await this.router.navigateByUrl('/funnel/reject');
      //       }else{
      //         this.openSnackBar(response.Mensaje, 'Cerrar');
      //       }
      //     }
      //   }
      // } 
      //debugger;
      if (response.IdError === 0) {
        this.loading = false;
        if (response.IdEstado == "5.1") {
          localStorage.setItem('InfoAccountsOutLay', JSON.stringify(response));
          // await this.router.navigateByUrl('/funnel/add-accounts');
          await this.router.navigateByUrl('/funnel/outlay');
        }
        if (response.IdEstado == 2) {
          localStorage.setItem('InfoAccounts', JSON.stringify(response));
          await this.router.navigateByUrl('/simulation');
        }
        if (response.IdEstado == 98) {
          await this.router.navigateByUrl('/funnel/reject');
        }
        if (response.IdEstado == 6) {
          localStorage.setItem('InfoAccounts', JSON.stringify(response));
          await this.router.navigateByUrl('/funnel/add-accounts');
        }
      }
      else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
      }
    });
  }
}
