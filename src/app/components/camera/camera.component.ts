import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { FaceDetectorComponent } from 'src/app/modules/funnel/pages/face-detector/face-detector.component';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {
  @Output()
  public pictureTaken = new EventEmitter<WebcamImage>();
  @Output() cancelEvent = new EventEmitter<boolean>();
 
  // toggle webcam on/off
  public showWebcam = true;


  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public flagPhotonOn = false;
  public webcamImageResp;

  public videoOptions: MediaTrackConstraints = {
    width: { ideal: 1250 },
    height: { ideal: 850 }
    // width: {ideal: 2500},
    // height: {ideal: 1700}
  };
  public errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
      setTimeout(() => {
        this.showNextWebcam(true);
      }, 1000);
  }

  constructor(
    public imgCacheComp: FaceDetectorComponent

  ) {
    this.imgCacheComp.imgCache().subscribe(data => {
      if (data) {
        this.triggerSnapshot();
        this.webcamImageResp = data;
        this.showWebcam = false;
      }
    });
  }
  public triggerSnapshot(): void {

    this.showWebcam = false;
    this.trigger.next();

  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }
  public continue(): void {
    this.pictureTaken.emit(this.webcamImageResp);

  }
  public restart(): void {
    this.showWebcam = true;
    this.webcamImageResp = null;
  }
  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    // console.info('received webcam image', webcamImage);
    this.webcamImageResp = webcamImage

  }

  public cameraWasSwitched(deviceId: string): void {
    // console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
  public emitCancel() {
    this.cancelEvent.emit(true);
  }
}
