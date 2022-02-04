import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../../../services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-validate-biometric',
  templateUrl: './validate-biometric.component.html',
  styleUrls: ['./validate-biometric.component.scss']
})
export class ValidateBiometricComponent implements OnInit {
  data: any;

  constructor(
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
  ) {
    this.data = JSON.parse(localStorage.getItem('userDataTemp'));

    // const confirmEmailData = {
    //   PrimerNombre: this.data.PrimerNombre,
    //   PrimerApellido: this.data.PrimerApellido,
    //   Correo: this.data.Correo,
    // };
    //
    // // Send confirmation email to user
    // this.dataService.sendConfirmEmail(confirmEmailData).subscribe(async (data: any) => {
    //   if (data.IdError === 0) {
    //     console.log('Done');
    //   } else {
    //     this.openSnackBar(data.Mensaje, 'Cerrar');
    //   }
    // });

    setTimeout(async () => {
      await this.router.navigateByUrl('/funnel/biometric-success');
    }, 2000);
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
