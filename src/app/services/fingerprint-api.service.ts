import {EventEmitter, Injectable} from '@angular/core';

// import '@tensorflow/tfjs';
// import '@tensorflow/tfjs-backend-webgl';

@Injectable({
  providedIn: 'root'
})
export class FingerprintApiService {

  public hp: any;
  callbackModels: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.loadModels();
  }

  public loadModels = async () => {

    this.callbackModels.emit(true);

    // this.callbackModels.emit(true);
    // console.log('Model loaded', this.hp);
  }
}
