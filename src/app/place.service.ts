import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  placeIdSubject = new Subject<string>();

  constructor(private db: AngularFirestore) {
  }

  getOpinions(placeId: string): firebase.firestore.DocumentReference {
    return this.db.doc(`/places/${placeId}`).ref;
  }
}
