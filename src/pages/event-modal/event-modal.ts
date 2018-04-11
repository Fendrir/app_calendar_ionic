import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';

// partie database firebase

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'; // remplace FirebaseListObservable
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { FirebaseService } from '../../providers/firebase-service/firebase-service';

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {

// côté serveur
  eventSourceDb: AngularFireList<any>;
  eventsCal: Observable<any[]>;

// coté client -- avoir la variable event qui puisse fonctionner aussi coté serveur ( je n'y arrive pas )
  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false};
  minDate = new Date().toISOString();

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    public viewCtrl: ViewController,
    public firebaseService: FirebaseService,

    db: AngularFireDatabase
  ) {

    // coté client

    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;

    //coté fireBase-- permet de pouvoir utiliser firebase et push mes données dans 'events'

    this.eventSourceDb = db.list('events');
    this.eventsCal = this.eventSourceDb.snapshotChanges().map(changes => {
      return changes.map(c => ({ 
        key: c.payload.key, ...c.payload.val()
      }));
    });

  }
  

  cancel() {
    this.viewCtrl.dismiss();
  }

  save(newTitle: string, newStartTime: Date, newEndTime: Date, newAllDay: boolean) {
    
    // permet de pousser les données coté clients récupéré ensuite par le viewctrl dans la partie home.ts

    this.viewCtrl.dismiss(this.event);

    // permet de push les données sur la db firebase dans 'events'

    this.eventSourceDb.push({ 
      text: newTitle,
      dateStart: newStartTime,
      dateEnd: newEndTime,
      allday: newAllDay
     });
  }

}
