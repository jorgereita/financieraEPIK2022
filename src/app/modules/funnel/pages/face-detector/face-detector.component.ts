import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { screens } from '../../../../utils/screens';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../../../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { timeout } from 'rxjs/operators';
import { ModalInfoComponent } from 'src/app/shared/components/modal-info/modal-info.component';


@Component({
  selector: 'app-face-detector',
  templateUrl: './face-detector.component.html',
  styleUrls: ['./face-detector.component.scss']
})
@Injectable({
  providedIn: 'root',
})
export class FaceDetectorComponent implements OnInit {

  data: any;
  public currentStream: any;
  public videoDimensions: any;
  loading = false;
  screenOn1: boolean = false;
  public webcamImage1: string = null;
  imageBack = 'assets/images/funnel/take-picture-overlay.png';
  imageSrc1 = 'assets/images/funnel/face-detection.png';
  waitSend = false;
  imageCache

  public observerCacheImg$ = new BehaviorSubject<any>('');
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    public dialogReasons: MatDialog,

  ) {
    this.data = JSON.parse(localStorage.getItem('userData'));
  }

  ngOnInit(): void {
    // this.checkMediaSources();
    this.getSizeCam();
    // console.log('initialize');
    this.toggleCamera1();
  }
  irPopUpInfo(data1) {
    // this.index2Relase = index;
    const dialogRef = this.dialogReasons.open(ModalInfoComponent, {
      width: '400px',
      height: '',
      data: { data: data1 }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        // this.myRequest.splice(this.index2Relase, 1);
      }
    });
  }
  cancelCamera() {
    this.router.navigateByUrl("/funnel/initial-query");
  }
  sendFacePhoto() {
    //console.log(this.webcamImage1)
  }
  public imgCache() {
    return this.observerCacheImg$.asObservable();
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  toggleCamera1() {
    this.webcamImage1 = null;
    this.screenOn1 = true;
  }
  handleImage1(webcamImage: any) {
    this.webcamImage1 = webcamImage.imageAsDataUrl;
    this.screenOn1 = true;
    this.imageCache = webcamImage
    this.takePhoto();
  }
  checkMediaSources = (): void => {
    if (navigator && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      }).then(stream => {
        this.currentStream = stream;
      }).catch(e => console.log('The user has been denied permission'));
    } else {
      alert('Este dispositivo no es compatible');
    }
  }

  getSizeCam = (): void => {
    // const elementCam: HTMLElement = document.querySelector('.face-match');
    // const { width, height } = elementCam.getBoundingClientRect();
    // this.videoDimensions = { width, height: height > 0 ? height : null };
  }

  async takePhoto(): Promise<void> {
    this.loading = true;
    const formData = {
      //IdConsulta: parseInt(localStorage.getItem('IdConsulta'), 10),
      //FotoPerfil: this.webcamImage1,
      "NumeroIdentificacion": this.data.NumeroIdentificacion ? this.data.NumeroIdentificacion : localStorage.getItem('NumeroDocumento'),
      "NumeroAutorizacion": this.data.NumeroAutorizacion ? this.data.NumeroAutorizacion : localStorage.getItem('NumeroAutorizacion'),
      FotoSelfie: this.webcamImage1,
    };
    this.dataService.sendFotoSelfie(formData).subscribe(async (response: any) => {
      //debugger;
      this.loading = false;
      if (response.IdError === 0) {
        if (response.IdEstado == 5) {
          if (response.IdConsulta !== undefined && response.IdConsulta !== null && response.IdConsulta !== '')
            localStorage.setItem('IdConsulta', response.IdConsulta)
          if (response.IdEstado !== undefined && response.IdEstado !== null && response.IdEstado !== '')
            localStorage.setItem('IdEstado', response.IdEstado);
          if (response.NumeroIdentificacion !== undefined && response.NumeroIdentificacion !== null && response.NumeroIdentificacion !== '')
            localStorage.setItem('NumeroDocumento', response.NumeroIdentificacion);
          if (response.NumeroAutorizacion !== undefined && response.NumeroAutorizacion !== null && response.NumeroAutorizacion !== '')
            localStorage.setItem('NumeroAutorizacion', response.NumeroAutorizacion);
          await this.router.navigateByUrl('dni-detector?side=placeholder-inverse');
        }
        else {
          this.irPopUpInfo(response.Mensaje);
          setTimeout(() => {
            this.observerCacheImg$.next(this.imageCache);
          }, 1000);
        }
      } else {
        // this.openSnackBar(response.Mensaje, 'Cerrar');
        this.irPopUpInfo(response.Mensaje);
        setTimeout(() => {
          this.observerCacheImg$.next(this.imageCache);
        }, 1000);
      }
    });
  }
}
