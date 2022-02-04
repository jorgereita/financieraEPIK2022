import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { codigoCIIUList, incomeList, laboralAntiquityList, occupationList } from 'src/app/utils/utils';
import { screens } from '../../../../utils/screens';
import { DataService } from '../../../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './date.adapter';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { allowChars, allowMix, allowNumbers, ObjectSize } from '../../../../services/utils';
import { ModalInfoComponent } from 'src/app/shared/components/modal-info/modal-info.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-additional-data',
  templateUrl: './additional-data.component.html',
  styleUrls: ['./additional-data.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class AdditionalDataComponent implements OnInit {
  loading: any;
  additionalDataForm: FormGroup;
  datosLaborales: FormGroup;
  datosFormContacto: FormGroup;
  incomeList: Array<any> = incomeList;
  occupationList: Array<any>;
  laborarlAntiquityList: Array<any>;
  ciiuCodeList: Array<any> = codigoCIIUList;
  MonedaExtranjera: any;
  Pep: any;
  datosBasicos = false;
  datosLab = true;
  datosContacto = false;

  sliderMin = 0
  sliderMax = 30000000
  prevData
  gridsize: number = 30;
  updateSetting(event) {
    this.gridsize = event.value;
  }
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public dialogReasons: MatDialog,
  ) {
    router.events.subscribe((val) => {
      if (this.route.snapshot.queryParams) { 
 
        if(this.route.snapshot.queryParams.step=="1"){
          this.datosBasicos = true;
          this.datosLab = false;
          this.datosContacto = false;
        }
        if(this.route.snapshot.queryParams.step=="2"){
          this.datosBasicos = false;
          this.datosLab = true;
          this.datosContacto = false;
        }
        if(this.route.snapshot.queryParams.step=="3"){
          this.datosBasicos = false;
          this.datosLab = false;
          this.datosContacto = true;
        }
      }
       
  });
    this.loadData();
    this.additionalDataForm = this.formBuilder.group({
      PEP: ['', Validators.required],
      MonedaExtranjera: ['', Validators.required],
      PrimerApellido: ['', Validators.required],
      FechaNacimiento: ['', Validators.required],
    });
    this.datosLaborales = this.formBuilder.group({
      IdActividadEconomica: ['', Validators.required],
      IdAntiguedadLaboral: ['', Validators.required],
      // IngresoMensual: ['', Validators.required],
      CodigoCIIU: ['', Validators.required],
    });
    this.datosFormContacto = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      Telefono: ['', Validators.required],

    });

    
  }
  openPopUpDetail(data1,title) {
    // this.index2Relase = index;
    const dialogRef = this.dialogReasons.open(ModalInfoComponent, {
      width: '400px',
      height: '',
      data: { data: data1,title:title }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        // this.myRequest.splice(this.index2Relase, 1);
      }
    });
  }
  ngOnInit(): void {
    registerLocaleData(es);
    if (this.route.snapshot.queryParams) { 
 
      if(this.route.snapshot.queryParams.step=="1"){
        this.datosBasicos = true;
        this.datosLab = false;
        this.datosContacto = false;
      }
      if(this.route.snapshot.queryParams.step=="2"){
        this.datosBasicos = false;
        this.datosLab = true;
        this.datosContacto = false;
      }
      if(this.route.snapshot.queryParams.step=="3"){
        this.datosBasicos = false;
        this.datosLab = false;
        this.datosContacto = true;
      }
    }
    this.prevData = localStorage.getItem("userData");
    if(this.prevData){
      let apellido=JSON.parse(this.prevData ).Apellido
      this.additionalDataForm.controls['PrimerApellido'].setValue(apellido)
    }
  }
  forzarFecha(picker: MatDatepicker<Date>) {
    picker.open();
  }
 
  onInputChange($event: any): void {
    setTimeout(() => {
      this.datosLaborales.controls['IngresoMensual'].setValue(parseInt(($event.target.value).replaceAll(".", "")));
    }, 100);
  }
  loadData(): void {
    this.dataService.catalogos().subscribe(data => {
      if (data.IdError == 0) {
        for (var e in data.Lista) {
          if (data.Lista[e].TipoCatalogo === "Ocupacion") {
            this.occupationList = data.Lista[e].Catalago;
          }
          if (data.Lista[e].TipoCatalogo === "Antiguedad Laboral") {
            this.laborarlAntiquityList = data.Lista[e].Catalago;
          }
          if (data.Lista[e].TipoCatalogo === "Actividades CIIU") {
            this.ciiuCodeList = data.Lista[e].Catalago;
          }
        }
      }
    });
  }
  allowCharsfilter(ev) {
    return allowChars(ev);
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  sendData() {
    const formData = {
      IdConsulta: parseInt(localStorage.getItem('IdConsulta'), 10),
      ...this.datosFormContacto.value,
    };
    this.loading = true;
    this.dataService.sendContData(formData).subscribe(async (response: any) => {
      //debugger;
      if (response.IdError === 0) {
        localStorage.setItem('userData', JSON.stringify(response));
        if (response.IdConsulta !== undefined && response.IdConsulta !== null && response.IdConsulta !== '')
          localStorage.setItem('IdConsulta', response.IdConsulta)
        if (response.IdEstado !== undefined && response.IdEstado !== null && response.IdEstado !== '')
          localStorage.setItem('IdEstado', response.IdEstado);
        if (response.NumeroIdentificacion !== undefined && response.NumeroIdentificacion !== null && response.NumeroIdentificacion !== '')
          localStorage.setItem('NumeroDocumento', response.NumeroIdentificacion);
        if (response.NumeroAutorizacion !== undefined && response.NumeroAutorizacion !== null && response.NumeroAutorizacion !== '')
          localStorage.setItem('NumeroAutorizacion', response.NumeroAutorizacion);
        this.loading = false;
        // await this.router.navigateByUrl(screens[response.IdPantalla]);
        if (response.IdEstado == "2") {
          this.router.navigateByUrl("/funnel/simulation");
        }
        if (response.IdEstado == "99") {
          this.router.navigateByUrl("/funnel/reject");
        }
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
      }
    });
  }
  sendDataAdditional(): void {
    const formData = {
      IdConsulta: parseInt(localStorage.getItem('IdConsulta'), 10),
      ...this.additionalDataForm.value,
    };
    this.loading = true;
    this.dataService.sendAddData(formData).subscribe(async (response: any) => {
      //debugger;
      if (response.IdError === 0) {
        localStorage.setItem('userData', JSON.stringify(response));
        if (response.IdConsulta !== undefined && response.IdConsulta !== null && response.IdConsulta !== '')
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
  sendDataLab(value): void {
    const formData = {
      IdConsulta: parseInt(localStorage.getItem('IdConsulta'), 10),
      ...this.datosLaborales.value,
      IngresoMensual:value,
    };
    this.loading = true;
    this.dataService.sendLabData(formData).subscribe(async (response: any) => {
      if (response.IdError === 0) {
        localStorage.setItem('userData', JSON.stringify(response));
        if (response.IdConsulta !== undefined && response.IdConsulta !== null && response.IdConsulta !== '')
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
