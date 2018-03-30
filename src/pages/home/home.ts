import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import * as moment from 'moment';

// partie database firebase

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'; // remplace FirebaseListObservable
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  eventSource = [];
  // eventSourceDb: AngularFireList<any[]>;
  // eventsCal: Observable<any>;
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
    private alertCtrl: AlertController
    // db: AngularFireDatabase
  ) {
    // this.eventSourceDb = db.list('events');
    // this.eventsCal = this.eventSourceDb.snapshotChanges().map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // });
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
