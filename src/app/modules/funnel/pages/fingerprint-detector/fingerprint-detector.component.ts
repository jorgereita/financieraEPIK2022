import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {screens} from '../../../../utils/screens';
import {FormBuilder} from '@angular/forms';
import {DataService} from '../../../../services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-fingerprint-detector',
  templateUrl: './fingerprint-detector.component.html',
  styleUrls: ['./fingerprint-detector.component.scss']
})
export class FingerprintDetectorComponent implements OnInit {

  public currentStream: any;
  public videoDimensions: any;
  private hasTorch = true;
  private track: MediaStreamTrack;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.checkMediaSources();
    this.getSizeCam();
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
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
    const elementCam: HTMLElement = document.querySelector('.fingerprint-match');
    const { width, height } = elementCam.getBoundingClientRect();
    this.videoDimensions = { width, height: height > 0 ? height : null };
  }

  async takePhoto($event: any): Promise<void> {
    this.loading = true;

    const formData = {
      IdConsulta: parseInt(localStorage.getItem('IdConsulta'), 10),
      Huella: $event.image,
    };

    this.dataService.financialSaveFingerprint(formData).subscribe(async (response: any) => {
      if (response.IdError === 0) {
        localStorage.setItem('IdConsulta', response.IdConsulta);
        localStorage.setItem('NumeroDocumento', response.NumeroIdentificacion);

        this.loading = false;
        // set IdConsulta
        const url = screens[response.IdPantalla];
        await this.router.navigateByUrl(url);
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
      }
    });
    // window.open('/funnel/dni-detector?side=placeholder', '_self');
  }
}
