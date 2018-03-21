import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ServizioOggettiPrestatiProvider } from '../providers/servizio-oggetti-prestati/servizio-oggetti-prestati';
import { HttpClientModule } from '@angular/common/http';
import { DettaglioPrestitoPage } from '../pages/dettaglio-prestito/dettaglio-prestito';
import { AggiungiPrestitoPage } from '../pages/aggiungi-prestito/aggiungi-prestito';
import { Camera } from '@ionic-native/camera';
import { NativeStorage } from '@ionic-native/native-storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DettaglioPrestitoPage,
    AggiungiPrestitoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DettaglioPrestitoPage,
    AggiungiPrestitoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServizioOggettiPrestatiProvider,
    Camera,
    NativeStorage
  ]
})
export class AppModule {}
