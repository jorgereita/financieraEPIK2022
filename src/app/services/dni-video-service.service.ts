import {EventEmitter, Injectable} from '@angular/core';
import {DniServiceService} from './dni-service.service';

@Injectable({
  providedIn: 'root'
})
export class DniVideoServiceService {

  callbackAI: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private dniService: DniServiceService,
  ) {

  }

  getLandMark = async (videoElement: any) => {

  }
}
