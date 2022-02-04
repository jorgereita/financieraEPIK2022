import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DataService} from '../../../../services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-identity-response',
  templateUrl: './identity-response.component.html',
  styleUrls: ['./identity-response.component.scss']
})
export class IdentityResponseComponent implements OnInit {

  basicDataForm: FormGroup;
  personalInfoForm: FormGroup;
  compensarInfoForm: FormGroup;
  documentTypes: Array<any> = [
    {
      Id: 1,
      Descripcion: 'Cédula de ciudadanía',
    },
    {
      Id: 2,
      Descripcion: 'Cédula de extranjería',
    },
    {
      Id: 3,
      Descripcion: 'NIT',
    }
  ];
  loading = false;
  firstPart = false; // return to true

  addresses: FormArray;
  phones: FormArray;
  emails: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
  ) {
    this.personalInfoForm = this.formBuilder.group({
      IdTipoDocumento: [1, [Validators.required]],
      NumeroIdentificacion: ['88158976', [Validators.required]],
      PrimerNombre: ['Paulo Cesar', [Validators.required]],
      PrimerApellido: ['Castro Florez', [Validators.required]],
      FechaNacimiento: ['20-FEB-1974', [Validators.required]],
      LugarNacimiento: ['Pamplona, Colombia', [Validators.required]],
      Estatura: ['1.78', [Validators.required]],
      GrupoSanguineo: ['A+', [Validators.required]],
      Sexo: ['M', [Validators.required]],
    });

    this.compensarInfoForm = this.formBuilder.group({

    });
  }

  ngOnInit(): void {
    this.basicDataForm = this.formBuilder.group({
      Telefonos: this.formBuilder.array([ this.createItemPhone() ]),
      Direcciones: this.formBuilder.array([ this.createItemAddress() ]),
      Correos: this.formBuilder.array([ this.createItemEmail() ]),
    });
  }

  createItemAddress(): FormGroup {
    return this.formBuilder.group({
      Direccion: ['', []],
    });
  }

  createItemPhone(): FormGroup {
    return this.formBuilder.group({
      Telefono: ['', []],
    });
  }

  createItemEmail(): FormGroup {
    return this.formBuilder.group({
      Correo: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
    });
  }

  addAddress(): void {
    this.addresses = this.basicDataForm.get('Direcciones') as FormArray;
    this.addresses.push(this.createItemAddress());
  }

  addPhone(): void {
    this.phones = this.basicDataForm.get('Telefonos') as FormArray;
    this.phones.push(this.createItemPhone());
  }

  addEmail(): void {
    this.emails = this.basicDataForm.get('Correos') as FormArray;
    this.emails.push(this.createItemEmail());
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  sendBasicData(): void {
    this.firstPart = false;
  }

  // async sendOTP(): Promise<void> {
  //   const formData = {
  //     NumeroIdentificacion: this.userData.NumeroIdentificacion,
  //   };
  //
  //   this.dataService.sendOTP(formData).subscribe(async (response: any) => {
  //     if (response.IdError === 0) {
  //       console.log('OTP sended');
  //     } else {
  //       this.openSnackBar(response.Mensaje, 'Cerrar');
  //     }
  //   });
  //
  //   await this.router.navigateByUrl('/funnel/otp');
  // }

  async sendData(): Promise<void> {
    this.loading = true;
    // Do stuff here
    // const formData = {
    //   ...this.basicDataForm.value,
    //   ...this.personalInfoForm.value,
    // };
    //
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

    await this.router.navigateByUrl('/funnel/otp');
  }

  addNewField(): void {
    console.log('saving');
  }
}
