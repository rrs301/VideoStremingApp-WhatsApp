import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { AppAPIService } from './app-api.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    private fcm: FCM,
    private api:AppAPIService
  ) {
    this.initializeApp();
    this.api.ResetUserStatic();
    this.api.UploadStatics();
  } 
   
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

       //Notifications
       this.fcm.subscribeToTopic('all');
       this.fcm.getToken().then(token=>{
           console.log(token);
       })
       this.fcm.onNotification().subscribe(data=>{
         if(data.wasTapped){
           console.log("Received in background");
         } else {
           console.log("Received in foreground");
         };
       })
       this.fcm.onTokenRefresh().subscribe(token=>{
         console.log(token);
       });

    });
    
  }
}
