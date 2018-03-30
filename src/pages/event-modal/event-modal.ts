import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';

// partie database firebase

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'; // remplace FirebaseListObservable
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {

  eventSourceDb: AngularFireList<any>;
  eventsCal: Observable<any[]>;

  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false};
  minDate = new Date().toISOString();

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    public viewCtrl: ViewController,

    db: AngularFireDatabase
  ) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;

    this.eventSourceDb = db.list('events');
    this.eventsCal = this.eventSourceDb.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  addEvent(newevent: string) {
    // this.viewCtrl.dismiss(this.event);
    this.eventSourceDb.push({ text: newevent });
  }

}
