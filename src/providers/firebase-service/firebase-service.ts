import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { EventModalPage } from './../../pages/event-modal/event-modal';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseService {

  // eventSourceDb: AngularFireList<any>;
  // eventsCal: Observable<any[]>;

  // constructor(
  //   public firebase: AngularFireDatabase,
  //   db: AngularFireDatabase
  // ) {
  //   this.eventSourceDb = db.list('events');
  //   this.eventsCal = this.eventSourceDb.snapshotChanges().map(changes => {
  //     return changes.map(c => ({
  //       key: c.payload.key, ...c.payload.val()
  //     }));
  //   });
  // }


  // partie de test dev item

  // addDevTest(newTitle: string) {
  //   this.eventSourceDb.push({title: newTitle});
  // }

  // addTestDevItem(name) {
  //   this.afd.list('/testDevItem/').push(name);
  // }

  // removeTestDevItem(id) {
  //   this.afd.list('/testDevItem/').remove(id);
  // }
}
