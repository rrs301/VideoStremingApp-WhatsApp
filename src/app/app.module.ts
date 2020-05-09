import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayVideoComponent } from './play-video/play-video.component';
import { Downloader } from '@ionic-native/downloader/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CategoryVideoComponent } from './category-video/category-video.component';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';


@NgModule({
  declarations: [AppComponent,PlayVideoComponent,CategoryVideoComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
  providers: [
    StatusBar,AdMobFree,
    SplashScreen,Downloader,SocialSharing,OneSignal,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule {}
