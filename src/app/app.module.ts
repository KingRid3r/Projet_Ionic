import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicImageViewerModule } from 'ionic-img-viewer';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DatesPage } from '../pages/dates/dates';
import { InfosPage } from '../pages/infos/infos';
import { GaleriesPage } from '../pages/galeries/galeries';
import { ConnectionPage } from '../pages/connection/connection';
import { TutorialPage } from '../pages/tuto/tuto';
import { connexionVar } from '../providers/connexionVar';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Calendar } from '@ionic-native/calendar';
import { Contacts } from '@ionic-native/contacts';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DatesPage,
    InfosPage,
    GaleriesPage,
    ConnectionPage,
    TutorialPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    DatesPage,
    InfosPage,
    GaleriesPage,
    ConnectionPage,
    TutorialPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    connexionVar,
    Calendar,
    Contacts,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
