
import { LoadpothosPage } from './../pages/loadpothos/loadpothos';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//pipes
import { PipesModule } from './../pipes/pipes.module';

//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//plugins
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { LoadFileProvider } from '../providers/load-file/load-file';


 // Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyA-oVpFf7CYJApsbwahiwsl2Kq6dt9Td8U",
  authDomain: "gag-1a723.firebaseapp.com",
  databaseURL: "https://gag-1a723.firebaseio.com",
  projectId: "gag-1a723",
  storageBucket: "gag-1a723.appspot.com",
  messagingSenderId: "932238407176"
};



@NgModule({
  declarations: [
    MyApp,
    HomePage, 
    LoadpothosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule, 
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, 
    LoadpothosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Camera,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoadFileProvider
  ]
})
export class AppModule {}
