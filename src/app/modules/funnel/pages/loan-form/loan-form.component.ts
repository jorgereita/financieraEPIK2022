import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DataService} from '../../../../services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {screens} from '../../../../utils/screens';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss']
})
export class LoanFormComponent implements OnInit {
  basicDataForm: FormGroup;
  personalInfoForm: FormGroup;
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
  loading = false;
  firstPart = true;
  url: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
  ) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    this.personalInfoForm = this.formBuilder.group({
      // IdTipoDocumento: ['1', [Validators.required]],
      // NumeroIdentificacion: ['', [Validators.required]],
      Telefono: [userData?.Telefono || '', [Validators.required]],
      // Direccion: ['', [Validators.required]],
      Email: [userData?.Email || '', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
    });

    this.basicDataForm = this.formBuilder.group({
      PrimerNombre: ['', [Validators.required]],
      SegundoNombre: ['', []],
      PrimerApellido: ['', [Validators.required]],
      SegundoApellido: ['', []],
    });
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  sendBasicData(): void {
    this.firstPart = false;
  }

  async sendData(): Promise<void> {
    this.loading = true;
    // Do stuff here
    let formData = {
      // ApiKey: 'Ep1kColombia2021*',
      ...this.personalInfoForm.value,
      NumeroIdentificacion: localStorage.getItem('NumeroIdentificacion'),
    };

 
      // localStorage.setItem('userData', JSON.stringify({...JSON.parse(localStorage.getItem('userData')), ...formData}));
      formData = {
        IdConsulta: parseInt(localStorage.getItem('IdConsulta'), 10),
        ...this.personalInfoForm.value,
      };
      this.dataService.financialUpdateUserData(formData).subscribe(async (response: any) => {
          //debugger;
          if (response.IdError === 0) {
          localStorage.setItem('userData', JSON.stringify(response));
          if (response.IdConsulta!== undefined && response.IdConsulta !== null && response.IdConsulta !== '')
            localStorage.setItem('IdConsulta', response.IdConsulta)
          if (response.IdEstado !== undefined && response.IdEstado !== null && response.IdEstado !== '')
            localStorage.setItem('IdEstado', response.IdEstado);
          if (response.NumeroIdentificacion !== undefined && response.NumeroIdentificacion !== null && response.NumeroIdentificacion !== '')
            localStorage.setItem('NumeroDocumento', response.NumeroIdentificacion);
          if (response.NumeroAutorizacion !== undefined && response.NumeroAutorizacion !== null && response.NumeroAutorizacion !== '')
            localStorage.setItem('NumeroAutorizacion', response.NumeroAutorizacion);
          this.loading = false;
          await this.router.navigateByUrl(screens[response.IdPantalla]);
        } else {
          this.openSnackBar(response.Mensaje, 'Cerrar');
          this.loading = false;
        }
      });
      // await this.router.navigateByUrl('/funnel/face-detector');
 
    // else if (localStorage.getItem('path') === 'other') {
    //   localStorage.setItem('userData', JSON.stringify({...JSON.parse(localStorage.getItem('userData')), ...formData}));
    //   await this.router.navigateByUrl('/funnel/face-detector');
    // } else {
    //   this.dataService.getOlimpiaOtp(formData).subscribe(async (response) => {
    //     console.log(response);
    //     if (response.IdError === 0) {
    //       localStorage.setItem('oUrl', response.Url);
    //       localStorage.setItem('userData', JSON.stringify({...formData, ...JSON.parse(localStorage.getItem('userData'))}));
    //       await this.router.navigateByUrl('/funnel/olimpia');
    //     } else {
    //       this.openSnackBar(response.Mensaje, 'Cerrar');
    //     }

    //     this.loading = false;
    //   });
    // }
    // // Crete new user
    // this.dataService.newUser(formData).subscribe(async (response: any) => {
    //   if (response.IdError === 0) {
    //     localStorage.setItem('userDataTemp', JSON.stringify(formData));
    //     await this.router.navigateByUrl('/funnel/pre-biometric');
    //     this.loading = false;
    //   } else {
    //     this.openSnackBar(response.Mensaje, 'Cerrar');
    //     this.loading = false;
    //   }
    // });
  }
}
