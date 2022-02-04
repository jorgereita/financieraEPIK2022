import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
//import {blackListedUsers, cleanData, whiteListedUsers} from '../../../../utils/utils';
import { screens } from 'src/app/utils/screens';
//import { allowNumbers } from 'src/app/services/utils';

@Component({
  selector: 'app-initial-query',
  templateUrl: './initial-query.component.html',
  styleUrls: ['./initial-query.component.scss']
})
export class InitialQueryComponent implements OnInit {

  basicDataForm: FormGroup;
  personalInfoForm: FormGroup;
  checkInfo: FormGroup;
  policys = false;
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
  dataRes
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private route:ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.personalInfoForm = this.formBuilder.group({
      // IdTipoIdentificacion: ['1', [Validators.required]],
      NumeroIdentificacion: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    });
    this.checkInfo = this.formBuilder.group({
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
    // cleanData();
    this.policys=false;
    if(this.route.snapshot.queryParams){
      this.personalInfoForm.controls['NumeroIdentificacion'].setValue( parseInt(this.route.snapshot.queryParams.doc));
       setTimeout(() => {
          document.getElementById("continue-btn").click();
       }, 100);
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  allowNumbersfilter(event) {
    var k;
    k = event.charCode;
    let lng = this.personalInfoForm.value.NumeroIdentificacion?.toString()
    if (lng?.length > 10 || (this.personalInfoForm.value.NumeroIdentificacion == 0 && k == 48)) {
      return false
    }
    let keychar = String.fromCharCode(k);
    if (keychar == ".") {
      return false
    }
    return (k == 8 || (k >= 48 && k <= 57));
  }

  sendBasicData(): void {
    this.firstPart = false;
  }

  async sendData(): Promise<void> {
    this.loading = true;
    // Do stuff here
    const formData = {
      IdTipoIdentificacion: '1',
      ...this.personalInfoForm.value,
    };

    localStorage.setItem('NumeroIdentificacion', this.personalInfoForm.value.NumeroIdentificacion);

    // if (this.isValidUser()) {
    //   const whiteUsers = whiteListedUsers.filter(u => u.NumeroIdentificacion === formData.NumeroIdentificacion);
    //   if (whiteUsers.length > 0) {
    //     localStorage.setItem('userData', JSON.stringify(whiteUsers[0]));
    //     await this.router.navigateByUrl('/funnel/query-loan-success');
    //   } else {
    //     await this.router.navigateByUrl('/funnel/auth-data');
    //   }
    // } else {
    //   await this.router.navigate(['/funnel/finish-flow'], { queryParams: { message: 'El usuario no es sujeto de crédito' }, state: { data: { isOk: false, } } });
    // }

    // Crete new user
    this.dataService.financialGetUserInfo(formData).subscribe(async (response: any) => {

      if (response != null && response.IdError === 0) {
        this.policys = true;
        this.loading = false;
        if(response.IdPantalla=="1"&&response.FlujoCliente==0){
          this.dataRes=response;
        }else{
          this.continue(response);
        }
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
      }
    });
  }
  async continue(response){
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
        if(response.PermiteCotizar && response.IdEstado == 1){
          await this.router.navigateByUrl('check-face');
        }
        else if(!response.PermiteCotizar && response.IdEstado == 1.1){
          await this.router.navigateByUrl('face-detector-presentation');
        }
        else{
          // Validar escenarios cuando ya termino flujo abordaje
          // FlujoCliente: 0; Abordaje
          // FlujoCliente: 1; Flujo cliente se toma foto para validar identidad
          // FlujoCliente: 2; Recompra
          if(response.FlujoCliente==1){
            if(response.IdEstado=="2"){
              this.router.navigateByUrl("funnel/simulation");
            }
          }
          if(response.FlujoCliente==2){
              this.router.navigateByUrl("face-detector-presentation");
          }
          if(response.FlujoCliente==0){
            this.router.navigateByUrl(screens[response.IdPantalla]);
        }
          
          // await this.router.navigateByUrl(screens[response.IdPantalla]);
        }
  }
  autorizacion() {
    window.open("https://financieraepik.blob.core.windows.net/archivo/Terminos/Autorizaci%C3%B3n%20datos%20personales%20-%20Epik.pdf", '_blank')
  }
  politica() {
    window.open("https://financieraepik.blob.core.windows.net/archivo/Terminos/Pol%C3%ADtica%20datos%20personales%20Epik.pdf", '_blank')
  }
  goTerminos() {
    window.open("https://financieraepik.blob.core.windows.net/archivo/Terminos/Pol%C3%ADtica%20datos%20personales%20Epik.pdf", '_blank')
  }
  /*
  private isValidUser(): boolean {
    const dni = localStorage.getItem('NumeroIdentificacion');
    if (blackListedUsers.includes(dni)) {
      return false;
    }
    return true;
  }
  */
}

