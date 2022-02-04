import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FirestoreService} from '../../../services/firestore/firestore.service';
import {FirebaseStorageService} from '../../../services/firestore/firebase-storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-fingerprint-match',
  templateUrl: './fingerprint-match.component.html',
  styleUrls: ['./fingerprint-match.component.scss']
})
export class FingerprintMatchComponent implements OnInit {

  public currentStream: any;
  public videoDimensions: any;
  private hasTorch = true;
  private track: MediaStreamTrack;

  constructor(
    private router: Router,
    private firestoreService: FirestoreService,
    private firebaseStorageService: FirebaseStorageService,
  ) { }

  ngOnInit(): void {
    this.checkMediaSources();
    this.getSizeCam();
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
        this.track = stream.getVideoTracks()[0];

        // Create image capture object and get camera capabilities
        const imageCapture = new window.ImageCapture(this.track);
        imageCapture.getPhotoCapabilities().then(() => {

          // todo: check if camera has a torch
          this.track.applyConstraints({
            // @ts-ignore
            advanced: [{ torch: this.hasTorch }]
          });

          // let there be light!
          // const btn = document.querySelector('.switch');
          // btn.addEventListener('click', () => {
          //
          // });
        });
      }).catch(e => console.log('The user has been denied permission'));
    } else {
      console.log('No media exists');
    }
  }

  getSizeCam = (): void => {
    const elementCam: HTMLElement = document.querySelector('.face-match');
    const { width, height } = elementCam.getBoundingClientRect();
    this.videoDimensions = { width, height };
  }

  async takePhoto($event: any): Promise<void> {
    console.log('SAMPLE');
    localStorage.setItem('fingerprint', $event.image);
    const name = `fingerprint-${Date.now()}`;
    // tslint:disable-next-line:max-line-length
    const result = await this.firebaseStorageService.refStorageFile().child(`/${name}`).putString($event.image, 'data_url', {contentType: 'image/jpg' });
    const image = await result.ref.getDownloadURL();

    const formData: any = {
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
      name,
      image,
      multiHandLandmarks: $event.results.multiHandLandmarks[0].map(item => ({ x: item.x, y: item.y, z: item.z })),
      multiHandedness: $event.results.multiHandedness[0],
      type: 'FINGERPRINT',
      data: {
        score: $event.results.multiHandedness[0].score,
        hand: $event.results.multiHandedness[0].label.toLowerCase(),
      }
    };

    console.log(formData);

    this.firestoreService.createImageInfo(formData).then(async () => {
      this.hasTorch = false;
      this.track.applyConstraints({
        // @ts-ignore
        advanced: [{ torch: this.hasTorch }]
      });
      await this.router.navigateByUrl('/funnel/biometric/last?selfie=ok&fingerprint=ok');
    }, (error) => {
      console.log(error);
    });
  }

}
