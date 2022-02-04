import { DOCUMENT } from '@angular/common';
import {Component, ElementRef, Inject, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import { VideoPlayerService } from 'src/app/services/video-player.service';
import {FaceApiService} from 'src/app/services/face-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  @Input() stream: any;
  @Input() width: number;
  @Input() height: number;
  @ViewChild('videoElement') videoElement: ElementRef;
  @ViewChild('canvas', {static: false}) canvas: ElementRef<HTMLCanvasElement>;
  listEvents: Array<any> = [];
  modelsReady: boolean;
  overCanvas: any;
  count = 2;
  photo: string;
  smileValidation = false;

  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private faceApiService: FaceApiService,
    private videoPlayerService: VideoPlayerService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  ngOnInit(): void {
    this.listenerEvents();
  }

  ngOnDestroy(): void {
    this.listEvents.forEach(e => e.unsubscribe());
  }

  listenerEvents = () => {
    const observer$ = this.faceApiService.callbackModels.subscribe(res => {
      // models are ready here
      this.modelsReady = true;
      this.checkFace();
    });

    const observer2$ = this.videoPlayerService.callbackAI
      .subscribe(({resizedDetections, displaySize, expressions, eyes, error, landMarks}) => {
        if (!error) {
          resizedDetections = resizedDetections || null;

          if (resizedDetections) {
            this.drawFace(resizedDetections, displaySize);
            // this.count--;

            if (resizedDetections.expressions.happy > 0.55) {
              this.smileValidation = true;
            }

            if (resizedDetections.expressions.neutral > 0.65 && this.smileValidation) {
              this.count --;
            }

            if (this.count === 0) {
              this.snapshot();
            }
          }
        } else {
          this.count = 2;
        }
      });

    this.listEvents = [observer$, observer2$];
  }

  drawFace = (resizedDetections, displaySize) => {
    const {globalFace} = this.faceApiService;
    console.log(resizedDetections);
    this.overCanvas.getContext('2d').clearRect(0, 0, displaySize.width, displaySize.height);
    // globalFace.draw.drawDetections(this.overCanvas, resizedDetections);
    // globalFace.draw.drawFaceLandmarks(this.overCanvas, resizedDetections);
  }

  checkFace = () => {
    setInterval(async () => {
      await this.videoPlayerService.getLandMark(this.videoElement);
    }, 1000);
  }

  loadedMetaData(): void {
    this.videoElement.nativeElement.play();
  }

  playListener(): void {
    const {globalFace} = this.faceApiService;
    this.overCanvas = globalFace.createCanvasFromMedia(this.videoElement.nativeElement);
    this.canvas.nativeElement = globalFace.createCanvasFromMedia(this.videoElement.nativeElement);
    this.renderer2.setProperty(this.overCanvas, 'id', 'new-over-canvas');
    this.renderer2.setProperty(this.canvas.nativeElement, 'width', this.width);
    this.renderer2.setProperty(this.canvas.nativeElement, 'height', this.height);
    this.renderer2.setStyle(this.canvas.nativeElement, 'width', `${this.width}px`);
    this.renderer2.setStyle(this.canvas.nativeElement, 'height', `${this.height}px`);
    console.count('renders');

    // const {globalFace} = this.faceApiService;
    // this.overCanvas = globalFace.createCanvasFromMedia(this.videoElement.nativeElement);
    // this.renderer2.setProperty(this.overCanvas, 'id', 'new-canvas-over');
    // this.renderer2.setStyle(this.overCanvas, 'width', `${this.width}px`);
    // this.renderer2.setStyle(this.overCanvas, 'height', `${this.height}px`);
    // this.renderer2.appendChild(this.elementRef.nativeElement, this.overCanvas);
  }

  async snapshot(): Promise<void> {
    this.playListener();
    this.overCanvas.getContext('2d').drawImage(this.canvas.nativeElement.getContext('2d').canvas, 0, 0, this.width, this.height);
    this.photo = this.overCanvas.toDataURL();
    console.log(this.photo);
    this.stream.getTracks().forEach((track) => {
      track.stop();
    });
    localStorage.setItem('selfie', this.photo);
    await this.router.navigateByUrl('/funnel/biometric/last?selfie=ok');
  }
}
