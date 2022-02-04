import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor(
    private storage: AngularFireStorage
  ) { }

  // upload file
  public uplaodfile(fileName: string, data: any): any {
    return this.storage.upload(fileName, data);
  }

  // ref a file
  public refStorageFile(dir?: string): any {
    return this.storage.ref(dir || 'fingerprints');
  }
}
