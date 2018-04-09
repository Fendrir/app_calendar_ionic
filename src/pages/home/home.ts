import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import * as moment from 'moment';

// partie database firebase

import { AngularFireDatabase, AngularFireList, AngularFireAction } from 'angularfire2/database'; // remplace FirebaseListObservable
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    // côté serveur

    // ----------------------------------------

    testdb$: Observable<any[]>;
    monEvent$: AngularFireList<any>;

    //----------------- test -------------------


    // testdb$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
    // monEvent$: BehaviorSubject<string|null>;

    //----------------- /test -------------------

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

  calendar = {
    mode: 'month',
    currentDate: this.selectedDay
  }

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthProvider,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,

    db: AngularFireDatabase
  ) {
  // --------- test ----------
    

    // this.monEvent$ = new BehaviorSubject(null);
    // this.testdb$ = this.monEvent$.switchMap(
    //   listEvent => db.list(('/events'),
    //   ref => listEvent ? ref
    //   .orderByChild('dateStart')
    //   :ref).snapshotChanges());
    
    // ce code fonctionne mais dans le home.html
    // il faut mettre comme clef : event.paylodad.val().dateStart.day par exemple
    
  //----------- test -----------

    this.monEvent$ = db.list('events');
    this.testdb$ = this.monEvent$.snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }));
    });
  
  }

  async logOut(): Promise<void> {
    await this.authProvider.logoutUser();
    this.navCtrl.setRoot('LoginPage');
  }

  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', { selectedDay: this.selectedDay });
    modal.present();

    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;

        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);

        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
          console.log(this.eventSource);
        });
      }
    })
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

  onEventSelected(event) {

    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');

    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();

  }

}
