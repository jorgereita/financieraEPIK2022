import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../../../services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.scss']
})
export class ValidateEmailComponent implements OnInit {
  token: string;
  userData: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.token = this.route.snapshot.params.token;

    // validate token
    this.dataService.validateEmail({ Token: this.token }).subscribe(async (data: any) => {
      if (data.IdError === 0) {
        this.userData = data;
        localStorage.setItem('userDataTemp', JSON.stringify(this.userData));
        // this.openSnackBar(data.Mensaje, 'Cerrar');
      } else {
        this.openSnackBar(data.Mensaje, 'Cerrar');
      }
    });
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  async sendOTP(): Promise<void> {
    const formData = {
      NumeroIdentificacion: this.userData.NumeroIdentificacion,
    };

    this.dataService.sendOTP(formData).subscribe(async (response: any) => {
      if (response.IdError === 0) {
        console.log('OTP sended');
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
      }
    });

    await this.router.navigateByUrl('/funnel/otp');
  }

}
