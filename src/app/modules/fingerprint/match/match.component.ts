import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  constructor(

  ) { }

  ngOnInit(): void {
  }



  async takePhoto($event: any): Promise<void> {
    console.log($event);
    // const name = `fingerprint-${Date.now()}`;
    // // tslint:disable-next-line:max-line-length
    // const result = await this.firebaseStorageService.refStorageFile().child(`/${name}`).putString($event.image, 'data_url', {contentType: 'image/jpg' });
    // const image = await result.ref.getDownloadURL();
    //
    // const formData: any = {
    //   createdAt: moment().format('YYYY-MM-DD'),
    //   updatedAt: moment().format('YYYY-MM-DD'),
    //   name,
    //   image,
    //   multiHandLandmarks: $event.results.multiHandLandmarks[0].map(item => ({ x: item.x, y: item.y, z: item.z })),
    //   multiHandedness: $event.results.multiHandedness[0],
    //   type: 'FINGERPRINT',
    //   data: {
    //     score: $event.results.multiHandedness[0].score,
    //     hand: $event.results.multiHandedness[0].label.toLowerCase(),
    //   }
    // };
    //
    // console.log(formData);
    //
    // this.firestoreService.createImageInfo(formData).then(async () => {
    //   this.hasTorch = false;
    //   this.track.applyConstraints({
    //     // @ts-ignore
    //     advanced: [{ torch: this.hasTorch }]
    //   });
    //   await this.router.navigateByUrl('/funnel/biometric/last?selfie=ok&fingerprint=ok');
    // }, (error) => {
    //   console.log(error);
    // });
  }
}
