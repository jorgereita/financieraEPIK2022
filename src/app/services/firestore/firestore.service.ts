import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore
  ) {}

  // Add ImageData
  public createImageInfo(data: { nombre: string, url: string }): any {
    return this.firestore.collection('images').add(data);
  }
  // get single image
  public getImage(documentId: string): any {
    return this.firestore.collection('images').doc(documentId).snapshotChanges();
  }
  // get all images
  public getImages(): any {
    return this.firestore.collection('images').snapshotChanges();
  }
  // update an image
  public updateImage(documentId: string, data: any): any {
    return this.firestore.collection('images').doc(documentId).update(data);
  }
}
