import {Component, ElementRef, Inject, Input, NgZone, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {DniServiceService} from '../../../services/dni-service.service';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

@Component({
  selector: 'app-dni-player',
  templateUrl: './dni-player.component.html',
  styleUrls: ['./dni-player.component.scss']
})
export class DniPlayerComponent implements OnInit, OnDestroy {

  @Input() stream: any;
  @Input() width: number;
  @Input() height: number;
  @ViewChild('dniVideoElement') dniVideoElement: ElementRef;
  @ViewChild('canvas', {static: false}) canvas: ElementRef<HTMLCanvasElement>;
  listEvents: Array<any> = [];
  modelsReady: boolean;
  overCanvas: any;
  count = 2;
  photo: string;
  side: any;
  classifications: any = [];
  type: string;
  private snapshotTaked = false;

  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private dniService: DniServiceService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    public ngZone: NgZone,
  ) {
    this.side = this.route.snapshot.queryParams.side || null;
  }

  ngOnInit(): void {
    this.listenerEvents();
  }

  ngOnDestroy(): void {

  }

  listenerEvents() {
    try {
      this.predictWithCocoModel();
    } catch(e) {
      console.log(e.message);
    }
    // this.checkFace();
    // const observer$ = this.dniService.callbackModels.subscribe(res => {
    //   // models are ready here
    //   console.log('things loaded here I wait for it', res);
    //
    // });

    // const observer2$ = this.dniVideoService.callbackAI
    //   .subscribe((res) => {
    //     console.log(res);
    //     // if (!error) {
    //     //   resizedDetections = resizedDetections[0] || null;
    //     //
    //     //   if (resizedDetections) {
    //     //     // this.drawFace(resizedDetections, displaySize, eyes);
    //     //     this.count--;
    //     //
    //     //     if (this.count === 0) {
    //     //       this.snapshot();
    //     //     }
    //     //   }
    //     // } else {
    //     //   console.log(error);
    //     //   this.resetCounter();
    //     // }
    //   });

    // this.listEvents = [observer$, observer2$];
  }

  // @ts-ignore
  public predictWithCocoModel(): void {
    try {
      console.log('Runs good');
      this.ngZone.runOutsideAngular(() => {
        // @ts-ignore
        cocoSsd.load().then(async (model) => {
          this.modelsReady = true;
          console.log(model);
          setTimeout(async () => await this.detectFrame(this.dniVideoElement.nativeElement, model), 2000);
        });
      });
    } catch (e) {
      console.log(e.message);
    }

  }

  detectFrame = (video, model) => {
    model.detect(video).then(predictions => {
      if (!this.snapshotTaked) {
        setTimeout(() => {
          const results = this.renderPredictions(predictions);
          console.log('Detecting....');
          this.onResults(results);
          requestAnimationFrame(() => {
            this.detectFrame(video, model);
          });
        }, 1000);
      }
    });
  }

  renderPredictions = predictions => {
    // const canvas = this.canvas.nativeElement;

    // const ctx = canvas.getContext('2d');
    // canvas.width  = 300;
    // canvas.height = 300;
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // // Fonts
    // const font = '16px sans-serif';
    // ctx.font = font;
    // ctx.textBaseline = 'top';
    // ctx.drawImage(this.dniVideoElement.nativeElement, 0, 0, 300, 300);
    // predictions.forEach(prediction => {
    //   return prediction.class;
    //   // const x = prediction.bbox[0];
    //   // const y = prediction.bbox[1];
    //   // const width = prediction.bbox[2];
    //   // const height = prediction.bbox[3];
    //   // // Bounding box
    //   // ctx.strokeStyle = '#00FFFF';
    //   // ctx.lineWidth = 2;
    //   // ctx.strokeRect(x, y, width, height);
    //   // // Label background
    //   // ctx.fillStyle = '#00FFFF';
    //   // const textWidth = ctx.measureText(prediction.class).width;
    //   // const textHeight = parseInt(font, 10); // base 10
    //   // ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    // });
    return predictions[0];
  }

  drawFace = (resizedDetections, displaySize, eyes) => {
    // const {hp} = this.dniService;
    this.canvas.nativeElement.getContext('2d')
      .clearRect(0, 0, displaySize.width, displaySize.height);
  }

  checkFace = () => {
    // setInterval(async () => {
    //   await this.dniVideoService.getLandMark(this.dniVideoElement);
    // }, 1000);
  }

  loadedMetaData(): void {
    this.dniVideoElement.nativeElement.play();
    this.setML();
  }

  playListener(): void {
    console.count('renders');
  }

  async snapshot(result: any): Promise<void> {
    const { bbox } = result;
    console.log(bbox);
    const canvasCtx = this.canvas.nativeElement.getContext('2d');
    const elementCam: HTMLElement = document.querySelector('.video-player');
    const { width, height } = elementCam.getBoundingClientRect();
    canvasCtx.canvas.width = width;
    canvasCtx.canvas.height = height;
    canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
    console.log(width, height);
    // // get the scale
    // const scale = Math.min(canvasCtx.canvas.width / width, canvasCtx.canvas.height / height);
    // // get the top left position of the image
    // const x = (canvasCtx.canvas.width / 2) - (width / 2) * scale;
    // const y = (canvasCtx.canvas.height / 2) - (height / 2) * scale;
    // // canvasCtx.drawImage(this.dniVideoElement.nativeElement, bbox[0], bbox[1], bbox[2], bbox[3], x, y, width, height);
    // canvasCtx.drawImage(this.dniVideoElement.nativeElement, 0, 0, (width * scale) * 1.3, height * scale);
    canvasCtx.drawImage(this.dniVideoElement.nativeElement, bbox[0], bbox[1], bbox[2], bbox[3], 0, 0, width, height);

    console.log(canvasCtx.canvas.toDataURL());
    this.snapshotTaked = true;

    if (this.side === 'placeholder') {
      localStorage.setItem('dni-placeholder', canvasCtx.canvas.toDataURL());
      await this.ngZone.run(async () => {
        await this.router.navigateByUrl('/funnel/biometric/first?anverse=ok');
      });
    } else {
      localStorage.setItem('dni-reverse', canvasCtx.canvas.toDataURL());
      await this.ngZone.run(async () => {
        await this.router.navigateByUrl('/funnel/biometric/first?anverse=ok&reverse=ok');
      });
    }
  }

  onResults(result): void {
    if (result && this.count > 0) {
      this.type = result.class;
      console.log(result);
      if (this.side === 'placeholder' && ['bench', 'tv', 'book', 'cell phone'].includes(result.class)) {
        console.log('Detectet!!!');
        this.counterDown(result);
      } else if (this.side === 'placeholder-inverse' && ['bench', 'tv', 'book', 'cell phone', 'suitcase', 'laptop'].includes(result.class)) {
        console.log('Detectet!!!');
        this.counterDown(result);
      } else {
        this.resetCounter();
      }
    } else {
      console.log('No dni recognized');
      this.resetCounter();
    }

    // if (this.overCanvas && this.overCanvas.nativeElement) {
    //   console.log('Having results form', results);
    //   const canvasCtx = this.overCanvas.nativeElement.getContext('2d');
    //   canvasCtx.save();
    //   canvasCtx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    //   canvasCtx.drawImage(results.image, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    //   if (results.multiHandLandmarks) {
    //     for (const landmarks of results.multiHandLandmarks) {
    //       window.drawConnectors(canvasCtx, landmarks, window.HAND_CONNECTIONS,
    //         {color: '#00FF00', lineWidth: 5});
    //       window.drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
    //     }
    //   }
    //   canvasCtx.restore();
    // }
  }

  async setML(): Promise<void> {

    console.log('making magic here');

    try {
      // const modelPromise = await this.dniService.globalCocoSsd.load();
      // const model = await mobileNet.load();
      //
      // console.log(modelPromise, model);

      // this.classifications = await model.classify(this.dniVideoElement.nativeElement);
      // console.log(this.classifications);
    } catch (e) {
      console.log(e);
    }

    // const hands = new window.Hands({locateFile: (file) => {
    //     return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    //   }});
    //
    // hands.setOptions({
    //   maxNumHands: 1,
    //   minDetectionConfidence: 0.3,
    //   minTrackingConfidence: 0.3,
    // });
    //
    // hands.onResults((results) => this.onResults(results));
    //
    // await hands.send({
    //   image: this.dniVideoElement.nativeElement
    // });
    //
    // try {
    //   setInterval(async () => await hands.send({image: this.dniVideoElement.nativeElement}), 1000);
    // } catch (e) {
    //   this.snapshot();
    // }
  }

  private counterDown(result: any): void {
    this.count--;

    if (this.count === 0) {
      this.snapshot(result);
    }
  }

  private resetCounter(): void {
    this.count = 2;
  }

}
