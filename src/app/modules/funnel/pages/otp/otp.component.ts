import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../../../services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  settings = {
    length: 4,
    allowNumbersOnly: true,
    placeholder: 5,
  };
  otpCode = '';
  time = 30;
  timer: any;
  data: any;
  loading = false;

  constructor(
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
  ) {
    this.data = JSON.parse(localStorage.getItem('userDataTemp'));
  }

  ngOnInit(): void {
    this.otpTimer();
    this.timer = setInterval(() => {
      this.otpTimer();
    }, 1000);
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  sendOTP(data): void {
    this.dataService.sendOTP(data).subscribe(async (response: any) => {
      if (response.IdError === 0) {
        this.openSnackBar('Validando número de contacto...', 'Cerrar');
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
      }
    });
  }

  private otpTimer(): void {
    if (this.time > 0) {
      this.time--;
    } else {
      clearInterval(this.timer);
    }
  }

  onInputChange($event: any): void {
    console.log($event);
    this.otpCode = $event;
  }

  resendCode(): void {
    // Do stuff here
    this.time = 30;
    this.timer = setInterval(() => {
      this.otpTimer();
    }, 1000);
    this.sendOTP({ NumeroIdentificacion: this.data.NumeroIdentificacion });
  }

  async sendCode(): Promise<void> {
    // this.loading = true;
    // Do stuff
    // const formData = {
    //   NumeroIdentificacion: this.data.NumeroIdentificacion,
    //   MensajeOTP: this.otpCode,
    // };
    //
    // this.dataService.validateOTP(formData).subscribe(async (response: any) => {
    //   if (response.IdError === 0) {
    //     // this.openSnackBar(response.Mensaje, 'Cerrar');
    //     await this.router.navigateByUrl('/funnel/otp-success');
    //     this.loading = false;
    //   } else {
    //     this.openSnackBar(response.Mensaje, 'Cerrar');
    //     this.loading = false;
    //   }
    // });
    await this.router.navigateByUrl('/funnel/otp-success');
  }
}
