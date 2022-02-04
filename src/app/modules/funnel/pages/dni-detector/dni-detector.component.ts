import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { screens } from '../../../../utils/screens';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../../../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalInfoComponent } from 'src/app/shared/components/modal-info/modal-info.component';

@Component({
  selector: 'app-dni-detector',
  templateUrl: './dni-detector.component.html',
  styleUrls: ['./dni-detector.component.scss']
})
export class DniDetectorComponent implements OnInit {

  data: any;
  public currentStream: any;
  public videoDimensions: any;
  side: any;
  loading = false;
  imageBack = 'assets/images/funnel/id-picture-overlay.png';
  screenOn1: boolean;
  screenOn2: boolean;
  screenOn3: boolean;
  public webcamImage1: string = null;
  public webcamImage2: string = null;
  public webcamImage3: string = null;
  imageSrc1 = 'assets/images/funnel/user-id.png';
  imageSrc2 = 'assets/images/funnel/user-id.png';
  imageSrc3 = 'assets/images/funnel/user-id.png';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public dialogReasons: MatDialog,
  ) {
    this.data = JSON.parse(localStorage.getItem('userData'));
    this.side = this.route.snapshot.queryParams.side;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(routeParams => {
      this.side = routeParams.side;
    });
    // this.checkMediaSources();
    // this.getSizeCam();
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  toggleCamera2() {
    this.webcamImage2 = null;
    this.screenOn2 = true;
  }
  toggleCamera3() {
    this.webcamImage3 = null;
    this.screenOn3 = true;
  }
  handleImage1(webcamImage: any) {
    this.webcamImage1 = webcamImage.imageAsDataUrl;
  }
  handleImage2(webcamImage: any) {
    this.webcamImage2 = webcamImage.imageAsDataUrl;
    this.takePhoto(this.webcamImage2);
  }
  handleImage3(webcamImage: any) {
    this.webcamImage3 = webcamImage.imageAsDataUrl;
    this.takePhoto(this.webcamImage3);
  }
  cancelarCamera1() {
    this.webcamImage1 = null;
    this.screenOn1 = false;
  }
  cancelarCamera2() {
    this.webcamImage2 = null;
    this.screenOn2 = false;
  }
  cancelarCamera3() {
    this.webcamImage3 = null;
    this.screenOn3 = false;
  }
  cancelCamera1() {
    this.router.navigateByUrl("/funnel/initial-query");
  }
  cancelCamera2() {
    this.router.navigateByUrl("/funnel/initial-query");
  }
  irPopUpInfo(data1) {
    // this.index2Relase = index;
    const dialogRef = this.dialogReasons.open(ModalInfoComponent, {
      width: '450px',
      height: '',
      data: { data: data1 }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        // this.myRequest.splice(this.index2Relase, 1);
      }
    });
  }
  checkMediaSources = (): void => {
    if (navigator && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: 'environment',
        },
      }).then(stream => {
        this.currentStream = stream;
      }).catch(e => console.log('The user has been denied permission'));
    } else {
      console.log('No media exists');
    }
  }

  getSizeCam = (): void => {
    const elementCam: HTMLElement = document.querySelector('.dni-match');
    const { width, height } = elementCam.getBoundingClientRect();
    this.videoDimensions = { width, height: height > 0 ? height : null };
  }

  async takePhoto(image): Promise<void> {
    if (this.side === 'placeholder') {
      localStorage.setItem('dni-placeholder', image);
      const formData = {
        IdConsulta: parseInt(localStorage.getItem('IdConsulta'), 10),
        // "NumeroIdentificacion": this.data.NumeroIdentificacion ? this.data.NumeroIdentificacion : localStorage.getItem('NumeroDocumento'),
        FotoDocumentoFrontal: image,
        "AceptaTratamientoDatos": true,
        "AceptaConsultaCentrales": true
      };
      this.loading = true;
      this.dataService.saveDniFront(formData).subscribe(async (response: any) => {
        //debugger;
        this.loading = false;
        if (response.IdError === 0) {
          if (response.IdConsulta!==undefined && response.IdConsulta !== null && response.IdConsulta !== '')
              localStorage.setItem('IdConsulta', response.IdConsulta)
          if (response.IdEstado !==undefined && response.IdEstado !== null && response.IdEstado !== '')
            localStorage.setItem('IdEstado', response.IdEstado);
          if (response.NumeroIdentificacion !==undefined && response.NumeroIdentificacion !== null && response.NumeroIdentificacion !== '')
            localStorage.setItem('NumeroDocumento', response.NumeroIdentificacion);
          if (response.NumeroAutorizacion !==undefined && response.NumeroAutorizacion !== null && response.NumeroAutorizacion !== '')
            localStorage.setItem('NumeroAutorizacion', response.NumeroAutorizacion);
          this.loading = false;
          
          localStorage.setItem("userData",JSON.stringify(response));
          await this.router.navigateByUrl(screens[response.IdPantalla]);
        } else {
          // this.openSnackBar(response.Mensaje, 'Cerrar');
          this.irPopUpInfo(response.Mensaje);
          this.loading = false;
        }
      });
    } else {
      // localStorage.setItem('dni-reverse', image);
      this.loading = true;
      const formData = {
        "NumeroIdentificacion": this.data.NumeroIdentificacion ? this.data.NumeroIdentificacion : localStorage.getItem('NumeroDocumento'),
        "NumeroAutorizacion": this.data.NumeroAutorizacion ? this.data.NumeroAutorizacion : localStorage.getItem('NumeroAutorizacion'),
        FotoDocumentoReverso: image,
      };
      this.loading = true;
      this.dataService.sendReversoDocumento(formData).subscribe(async (response: any) => {
        //debugger;
        this.loading = false;
        if (response.IdError === 0) {
          if (response.IdEstado == 6) {
            if (response.IdConsulta!== undefined && response.IdConsulta !== null && response.IdConsulta !== '')
              localStorage.setItem('IdConsulta', response.IdConsulta)
            if (response.IdEstado !== undefined && response.IdEstado !== null && response.IdEstado !== '')
              localStorage.setItem('IdEstado', response.IdEstado);
            if (response.NumeroIdentificacion !== undefined && response.NumeroIdentificacion !== null && response.NumeroIdentificacion !== '')
              localStorage.setItem('NumeroDocumento', response.NumeroIdentificacion);
            if (response.NumeroAutorizacion !== undefined && response.NumeroAutorizacion !== null && response.NumeroAutorizacion !== '')
              localStorage.setItem('NumeroAutorizacion', response.NumeroAutorizacion);  
            await this.router.navigateByUrl('/funnel/backoffice');
          }
          else{
            this.irPopUpInfo(response.Mensaje);
          }
        } else {
          // this.openSnackBar(response.Mensaje, 'Cerrar');
          this.irPopUpInfo(response.Mensaje);
        }
      });
    }
  }
}
