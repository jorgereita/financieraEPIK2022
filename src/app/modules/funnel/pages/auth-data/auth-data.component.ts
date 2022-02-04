import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DataService} from '../../../../services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {screens} from '../../../../utils/screens';

@Component({
  selector: 'app-auth-data',
  templateUrl: './auth-data.component.html',
  styleUrls: ['./auth-data.component.scss']
})
export class AuthDataComponent implements OnInit {

  basicDataForm: FormGroup;
  personalInfoForm: FormGroup;
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
  firstPart = true;
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
  ) {
    this.data = JSON.parse(localStorage.getItem('userData'));

    this.personalInfoForm = this.formBuilder.group({
      AceptaTratamientoDatos: ['', [Validators.required, Validators.requiredTrue]],
      AceptaConsultaCentrales: ['', [Validators.required, Validators.requiredTrue]]
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
  autorizacion(){
    window.open("https://financieraepik.blob.core.windows.net/archivo/Terminos/Autorizaci%C3%B3n%20datos%20personales%20-%20Epik.pdf",'_blank')
  }
  politica(){
    window.open("https://financieraepik.blob.core.windows.net/archivo/Terminos/Pol%C3%ADtica%20datos%20personales%20Epik.pdf",'_blank')
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
    const formData = {
      IdConsulta: parseInt(localStorage.getItem('IdConsulta'), 10),
      ...this.personalInfoForm.value,
    };
    this.dataService.financialUserDataManipulationAgreement(formData).subscribe(async (response: any) => {
      //debugger;
      if (response.IdError === 0) {
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
  }

}
