import {EventEmitter, Injectable} from '@angular/core';
import {FingerprintApiService} from './fingerprint-api.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class FingerprintVideoServiceService {

  callbackAI: EventEmitter<any> = new EventEmitter<any>();

  constructor(

  ) {

  }

  getLandMark = async (videoElement: any) => {
    try {
      // const model = await this.fingerprintApiService.hp;
      //
      // const {videoWidth, videoHeight } = videoElement.nativeElement;
      // const displaySize = {width: videoWidth, height: videoHeight};
      //
      // if (videoElement.nativeElement) {
      //   const predictions = await model.estimateHands(videoElement.nativeElement, true);
      //   console.log('The hand', predictions);
      //
      //   if (predictions.length > 0) {
      //     for (let i = 0; i < predictions.length; i++) {
      //       const keypoints = predictions[i].landmarks;
      //
      //       // Log hand keypoints.
      //       for (let i = 0; i < keypoints.length; i++) {
      //         const [x, y, z] = keypoints[i];
      //         console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
      //       }
      //     }
      //
      //   }
      // }

      this.callbackAI.emit({
        // resizedDetections,
        // displaySize,
        // eyes,
        error: false,
      });
    } catch (err) {
      console.log(err.message);
      this.callbackAI.emit({
        error: true,
      });
    }
  }
}
