import {AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {FingerprintVideoServiceService} from '../../../services/fingerprint-video-service.service';
import {FingerprintApiService} from '../../../services/fingerprint-api.service';
import {FaceApiService} from '../../../services/face-api.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-fingerprint-video-player',
  templateUrl: './fingerprint-video-player.component.html',
  styleUrls: ['./fingerprint-video-player.component.scss']
})
export class FingerprintVideoPlayerComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() stream: any;
  @Input() width: number;
  @Input() height: number;
  @Output() takePhoto: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('fingerprintVideoElement') fingerprintVideoElement: ElementRef;
  @ViewChild('canvas', {static: false}) canvas: ElementRef<HTMLCanvasElement>;
  listEvents: Array<any> = [];
  modelsReady: boolean;
  overCanvas: any;
  count = 50;
  photo: string;
  hand: any;
  message: string;
  screenshotTaked = false;

  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private fingerprintApiService: FingerprintApiService,
    private faceApiService: FaceApiService,
    // private fingerprintVideoPlayerService: FingerprintVideoServiceService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
  ) {

    this.hand = this.route.snapshot.queryParams.hand || null;
  }

  ngOnInit(): void {
    this.listenerEvents();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.listEvents.forEach(e => e.unsubscribe());
  }

  listenerEvents = () => {
    this.modelsReady = true;
    // const observer$ = this.fingerprintApiService.callbackModels.subscribe(res => {
    //   // models are ready here
    //   console.log('things loaded here I wait for it', res);
    //
    //   this.checkFace();
    // });
    //
    // const observer2$ = this.fingerprintVideoPlayerService.callbackAI
    //   .subscribe(({resizedDetections, displaySize, expressions, eyes, error}) => {
    //     if (!error) {
    //       resizedDetections = resizedDetections[0] || null;
    //
    //       if (resizedDetections) {
    //         // this.drawFace(resizedDetections, displaySize, eyes);
    //         this.count--;
    //
    //         if (this.count === 0) {
    //           this.snapshot();
    //         }
    //       }
    //     } else {
    //       console.log(error);
    //       this.resetCounter();
    //     }
    //   });
    //
    // this.listEvents = [observer$, observer2$];
  }

  drawFace = (results, displaySize) => {
    const canvasCtx = this.canvas.nativeElement.getContext('2d');
    canvasCtx.drawImage(results.image, 0, 0, displaySize.width, displaySize.height);
    this.playListener();
    if (results.multiHandLandmarks && this.hand.includes(results.multiHandedness[0].label.toLowerCase())) {
      this.message = null;
      for (const landmarks of results.multiHandLandmarks) {
        // console.log(landmarks);
        const filteredLandmarks = landmarks.filter((landmark, index) => [8, 12, 16, 20].includes(index));
        // console.log(filteredLandmarks);
        // window.drawConnectors(canvasCtx, landmarks, window.HAND_CONNECTIONS, {color: '#00FF00', lineWidth: 5});
        window.drawLandmarks(canvasCtx, filteredLandmarks, {
          color: '#46DB9E',
          fillColor: '#00FF0000',
          radius: (x) => {
            return window.lerp(x.from.z, -0.1, .40, 45, 1);
          }
        });
      }
    } else {
      this.message = `Ubica la mano`;
    }
    canvasCtx.restore();
  }

  checkFace = () => {
    // setInterval(async () => {
    //   await this.fingerprintVideoPlayerService.getLandMark(this.fingerprintVideoElement);
    // }, 1000);
  }

  loadedMetaData(): void {
    this.fingerprintVideoElement.nativeElement.play();
    this.setML();
  }

  playListener(): void {
    this.renderer2.setProperty(this.canvas.nativeElement, 'width', this.width);
    this.renderer2.setProperty(this.canvas.nativeElement, 'height', this.height);
    this.renderer2.setStyle(this.canvas.nativeElement, 'width', `${this.width}px`);
    this.renderer2.setStyle(this.canvas.nativeElement, 'height', `${this.height}px`);
  }

  async snapshot(results): Promise<void> {
    // this.playListener();
    const canvasCtx = this.canvas.nativeElement.getContext('2d');
    const elementCam: HTMLElement = document.querySelector('.face-match');
    const { width, height } = elementCam.getBoundingClientRect();

    // get the scale
    const scale = Math.min(canvasCtx.canvas.width / width, canvasCtx.canvas.height / height);
    // get the top left position of the image
    const x = (canvasCtx.canvas.width / 2) - (width / 2) * scale;
    const y = (canvasCtx.canvas.height / 2) - (height / 2) * scale;
    // tslint:disable-next-line:max-line-length
    canvasCtx.drawImage(this.fingerprintVideoElement.nativeElement, x, y, (width * scale) * 1.3, height * scale);
    // const anchor = document.createElement('a');
    // anchor.download = `fingers.png`;
    // anchor.href = canvasCtx.canvas.toDataURL('image/png');
    // anchor.click();
    this.screenshotTaked = true;

    setTimeout(() => this.screenshotTaked = false, 1000);

    this.takePhoto.emit({
      image: canvasCtx.canvas.toDataURL('image/jpg'),
      results,
    });
  }

  onResults(results): void {
    this.drawFace(results, { width: this.width, height: this.height });
    if (results && this.count > 0) {
      if (results.multiHandLandmarks && this.hand.includes(results.multiHandedness[0].label.toLowerCase())) {
        console.log('Having results form', results);
        this.counterDown(results);
      } else {
        console.log('No hands recognized');
        this.resetCounter();
      }
    }
  }

  async setML(): Promise<void> {

    const hands = new window.Hands({locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }});

    hands.setOptions({
      maxNumHands: 1,
      minDetectionConfidence: 0.8,
      minTrackingConfidence: 0.8,
    });

    hands.onResults((results) => this.onResults(results));

    await hands.send({
      image: this.fingerprintVideoElement.nativeElement
    });

    try {
      setInterval(async () => await hands.send({image: this.fingerprintVideoElement.nativeElement}), 10);
    } catch (e) {
      this.snapshot(null);
    }
  }

  private counterDown(results): void {
    this.count--;

    if (this.count === 0) {
      this.snapshot(results);
    } else if (this.count < 0) {
      this.resetCounter();
    }
  }

  private resetCounter(): void {
    this.count = 50;
  }
}
