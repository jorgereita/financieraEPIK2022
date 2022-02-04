import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ModalInfoComponent } from 'src/app/shared/components/modal-info/modal-info.component';
import { screens } from 'src/app/utils/screens';

@Component({
  selector: 'app-face-validation',
  templateUrl: './face-validation.component.html',
  styleUrls: ['./face-validation.component.scss']
})
export class FaceValidationComponent implements OnInit {

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
  ) { }

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
    this.router.navigateByUrl("/menu/daily-face");
  }
  sendFacePhoto() {
    console.log(this.webcamImage1)

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

    // this.dataService.financialSaveSelfie(formData).subscribe(async (response: any) => {
    //    this.loading = false;
    //   if (response.IdError === 0) {
    //     localStorage.setItem('IdConsulta', response.IdConsulta);
    //     localStorage.setItem('NumeroDocumento', response.NumeroIdentificacion);
    //     // set IdConsulta
    //     const url = screens[response.IdPantalla];
    //     await this.router.navigateByUrl(url);
    //   } else {
    //     // this.openSnackBar(response.Mensaje, 'Cerrar');
    //     this.irPopUpInfo(response.Mensaje);
    //     setTimeout(() => {
    //       this.observerCacheImg$.next(this.imageCache);
    //     }, 1000);
    //   }
    // });
    let itemToSend = {
      "Foto": this.webcamImage1,
      "Latitud": Number(localStorage.getItem("Latitud")),
      "Longitud": Number(localStorage.getItem("Longitud"))
    }

    this.dataService.identificarRostro(itemToSend).subscribe(async (data: any) => {
      this.loading = false;
      if (data.IdError == 1 || data.IdError == -999) {
        this.openSnackBar("Error.", "Cerrar");
      }
      if (data.IdError == 2) {
        this.irPopUpInfo("La fotografía no contiene rostros legibles, vuelva a intentarlo.");
      }
      if (data.IdError == 3 || data.IdError == 4) {
        this.irPopUpInfo("No existe una concidencia para este usuario.");
        // this.validate = false;
        // this.validateFalse = true;
        // this.validateTrue = false;
        // setTimeout(function () {
        //   localStorage.removeItem("email");
        //   localStorage.removeItem("expired");
        //   localStorage.removeItem("roleId");
        //   localStorage.removeItem("idTokenFace");
        // }, 2000);
      }

      if (data.IdError == 0) {
        this.openSnackBar("Bienvenido.", "Cerrar");
        // this.validate = false;
        // this.validateFalse = false;
        // this.validateTrue = true;
        setTimeout(() => {
          this.router.navigate(["/funnel/initial-query"]);
        }, 2000);
        var idTokenFace = (parseInt(localStorage.getItem("expired"))) * 101011;
        localStorage.setItem("idTokenFace", idTokenFace.toString());

      }
    });
  }
}
