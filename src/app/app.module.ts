import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

// authentification en page d'accueil

import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';

// module calendar

import { NgCalendarModule } from 'ionic2-calendar';

// connexion bdd poir pousser les events
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseService } from './../providers/firebase-service/firebase-service';
import { firebaseConfig } from './credentials';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    NgCalendarModule,
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    FirebaseService
  ]
})
export class AppModule {}
