import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-face',
  templateUrl: './face.component.html',
  styleUrls: ['./face.component.scss']
})
export class FaceComponent implements OnInit {
  public currentStream: any;
  public videoDimensions: any;

  constructor() { }

  ngOnInit(): void {
    this.checkMediaSources();
    this.getSizeCam();
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
      console.log('No media exists');
    }
  }

  getSizeCam = (): void => {
    const elementCam: HTMLElement = document.querySelector('.face-match');
    const { width, height } = elementCam.getBoundingClientRect();
    this.videoDimensions = { width, height };
  }

}
