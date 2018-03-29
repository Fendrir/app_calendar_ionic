import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class FirebaseService {

  constructor(public afd: AngularFireDatabase) { }


  // partie de test dev item

  getTestDevItem() {
    return this.afd.list('/testDevItem/');
  }

  addTestDevItem(name) {
    this.afd.list('/testDevItem/').push(name);
  }

  removeTestDevItem(id) {
    this.afd.list('/testDevItem/').remove(id);
  }
}
