import { Component, OnInit } from '@angular/core';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { Observable } from 'rxjs';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../../../services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-biometric',
  templateUrl: './biometric.component.html',
  styleUrls: ['./biometric.component.scss']
})
export class BiometricComponent implements OnInit {
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    width: {ideal: 1024},
    height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage1: string = null;
  public webcamImage2: string = null;
  public webcamImage3: string = null;
  public webcamImage4: string = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  innerHeight: any;
  innerWidth: any;
  placeholder = 'assets/img/funnel/selfie.png';
  initialPlaceholder = 'a';
  data: any;
  loading = false;
  showBiometricCam = false;
  showHandSelector = false;
  message: string;
  activeSelection: string;
  loadingActive = false;
  loader = false;
  selfieError: any;
  section: string;
  hasFaceRecognition: any;
  hasFingerprintRecognition: any;
  hasAnverse: any;
  hasReverse: any;
  IdConsulta: any;
  dniPlaceholderImage: any;
  dniReverseImage: any;
  selfieImage: any;
  fingerprintImage: any;
  dniPlaceholderImageError: boolean;
  dniReverseImageError: boolean;
  fingerprintImageError: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private snackBar: MatSnackBar,
  ) {
    this.data = JSON.parse(localStorage.getItem('userDataTemp'));
    this.IdConsulta = localStorage.getItem('IdConsulta');
    this.dniPlaceholderImage = localStorage.getItem('dni-placeholder');
    this.dniReverseImage = localStorage.getItem('dni-reverse');
    this.selfieImage = localStorage.getItem('selfie');
    this.fingerprintImage = localStorage.getItem('fingerprint');
    this.selfieError = localStorage.getItem('selfieError');

    this.section = this.route.snapshot.params.itemSection || null;
    this.hasFaceRecognition = this.route.snapshot.queryParams.selfie || null;
    this.hasFingerprintRecognition = this.route.snapshot.queryParams.fingerprint || null;
    this.hasAnverse = this.route.snapshot.queryParams.anverse || null;
    this.hasReverse = this.route.snapshot.queryParams.reverse || null;
  }

  ngOnInit(): void {
    this.innerHeight = window.innerHeight;
    this.innerWidth = window.innerWidth;

    this.videoOptions = {
      width: {ideal: this.innerWidth},
      height: {ideal: this.innerHeight},
    };

    this.videoOptions = {
      width: this.innerWidth,
      height: this.innerHeight,
    };

    console.log(this.innerHeight, this.innerWidth);

    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  async triggerSnapshot(setup: string): Promise<void> {
    this.loadingPage();
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', this.initialPlaceholder, webcamImage);

    switch (this.activeSelection) {
      case 'document':
        this.webcamImage1 = webcamImage.imageAsDataUrl;
        break;
      case 'documentInverse':
        this.webcamImage2 = webcamImage.imageAsDataUrl;
        break;
      case 'selfie':
        this.webcamImage3 = webcamImage.imageAsDataUrl;
        break;
      case 'right-hand':
        this.webcamImage4 = webcamImage.imageAsDataUrl;
        break;
      case 'left-hand':
        this.webcamImage4 = webcamImage.imageAsDataUrl;
        break;
    }

    this.showBiometricCam = false;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  showBiometric(type: string): void {
    switch (type) {
      case 'document':
        this.showBiometricCam = true;
        this.placeholder = 'assets/img/funnel/placeholder.png';
        this.initialPlaceholder = 'b';
        this.activeSelection = 'document';
        this.message = 'Ajusta tu documento con la cara frontal y presiona el botón';
        break;
      case 'documentInverse':
        this.showBiometricCam = true;
        this.placeholder = 'assets/img/funnel/placeholder-inverse.png';
        this.initialPlaceholder = 'b';
        this.activeSelection = 'documentInverse';
        this.message = 'Ajusta tu documento por el reverso y presiona el botón';
        break;
      case 'selfie':
        this.selfieError = !this.selfieError;
        this.showBiometricCam = true;
        this.placeholder = 'assets/img/funnel/selfie.png';
        this.initialPlaceholder = 'a';
        this.activeSelection = 'selfie';
        this.message = 'Cambia la cámara y ubica tu rostro dentro del círculo y presiona el botón';
        break;
      case 'right-hand':
        this.showBiometricCam = true;
        this.placeholder = 'assets/img/funnel/right-hand.png';
        this.initialPlaceholder = 'a';
        this.activeSelection = 'right-hand';
        this.showHandSelector = false;
        this.message = 'Ubica los dedos de tu mano como se indíca en la imagen';
        break;
      case 'left-hand':
        this.showBiometricCam = true;
        this.placeholder = 'assets/img/funnel/left-hand.png';
        this.initialPlaceholder = 'a';
        this.activeSelection = 'left-hand';
        this.showHandSelector = false;
        this.message = 'Ubica los dedos de tu mano como se indíca en la imagen';
        break;
    }
  }

  async sendData(): Promise<void> {
    this.loader = true;

    if (this.section === 'first') {
      window.open('/funnel/biometric/last', '_self');
      // const formData = {
      //   FotoPerfil: this.selfieImage,
      //   // FotoDocumento: this.dniPlaceholderImage, // only for test purposes
      //   FotoDocumento: this.selfieImage,
      //   FotoDocumentoReverso: this.dniReverseImage,
      //   DatoHuella: this.fingerprintImage,
      //   IdConsulta: parseInt(localStorage.getItem('IdConsulta'), 10),
      // };
      //
      // this.dataService.alucashValidateBiometric(formData).subscribe(async (response: any) => {
      //   console.log(response);
      //   if ([0, 1].includes(response.IdError)) {
      //     // Send to validation view
      //     this.loader = false;
      //     // set IdConsulta
      //     const url = screens[response.IdPantalla];
      //     this.IdConsulta = response.IdConsulta;
      //     localStorage.setItem('IdConsulta', response.IdConsulta);
      //     await this.router.navigate([url], { queryParams: { message: response.Mensaje } });
      //   } else {
      //     this.openSnackBar(response.Mensaje, 'Cerrar');
      //     this.loader = false;
      //   }
      // });

      this.loader = false;
    } else {
      window.open('/funnel/otp', '_self');
      this.loader = false;
    }
  }

  private loadingPage(): void {
    this.loadingActive = true;
    setTimeout(() => this.loadingActive = false, 2000);
  }

  checkImages(): boolean {
    if (this.section === 'first') {
      return this.dniPlaceholderImage === null || this.dniReverseImage === null;
    } else {
      return this.selfieError || this.selfieImage === null || this.fingerprintImage === null;
    }
  }

  async sentTo(route: string, strategy?: string): Promise<void> {
    localStorage.removeItem('selfieError');
    await this.router.navigateByUrl(route);
    // if (strategy === 'route') {
    //   await this.router.navigateByUrl(route);
    // } else {
    //   window.open(route, '_self');
    // }
  }
}
