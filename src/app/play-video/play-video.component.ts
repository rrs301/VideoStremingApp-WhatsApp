import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppAPIService } from '../app-api.service';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Platform } from '@ionic/angular';
import Swal from 'sweetalert2';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free/ngx';


@Component({
  selector: 'app-play-video',
  templateUrl: './play-video.component.html',
  styleUrls: ['./play-video.component.scss'],
})
export class PlayVideoComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private socialSharing: SocialSharing, public platform   : Platform,
    private api:AppAPIService,private router:Router,
    private admobFree: AdMobFree,
    
    private downloader:Downloader) { }

  url:any;
  title:string;
  categoryVideosList:any=[];
  dataCount=25;
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.url = params['url'];
      this.title = params['title'];
      console.log(this.title);
    });

    this.getCategoryVideo();
    this.ShowFullAdmobAd();
    this.showBanner();
    this.api.SaveUserVideoStatics();
  }

 
 
  getCategoryVideo()
   {
       this.api.getRandomVideo(this.dataCount).subscribe(data=>{
         this.categoryVideosList=data;
         console.log(data);
       })
   }

   playVideo(url:string,title:string)
   {
     this.url=url;
     this.title=title;
   }
   DownloadVideo()
   {
    
    let request: DownloadRequest = {
      uri: "https://www.playbox99.com/app/API/videos/romantic/2265855180832918192.mp4",
      title: 'MyDownload',
      description: '',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
          dirType: 'Downloads',
          subPath: ''
      }

      
      
  };


this.downloader.download(request)
          .then((location: string) => {
            console.log('File downloaded at:'+location)
            this.api.showMsgDialog(location);
        
        })
          .catch((error: any) => console.error(error));

          this.api.showMsgDialog("Download Started");
          this.api.SaveUserDownloadStatics();
   }

  
   shareBtn()
   {
    this.api.presentLoading();
      this.platform.ready()
      .then(() => 
      {		  		

         this.socialSharing.share(this.title, "\nDownload the VideoBox App from Playstore\n", this.url, this.url)
         .then((data) =>
         {
            console.log('Shared via SharePicker');
            this.api.dismissLoading();
            this.api.SaveUserShareStatics();
         })
         .catch((err) =>
         {
            console.log('Was not shared via SharePicker');
         });

      });
   }

 
   ShowFullAdmobAd()
   {
    if(this.platform.is('cordova'))
    {

    const FullAdConfig: AdMobFreeInterstitialConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      
      id:'ca-app-pub-6794621608321846/8591583220',
      isTesting: true,
      autoShow: true
     };
     this.admobFree.interstitial.config(FullAdConfig);
     
     this.admobFree.interstitial.prepare()
       .then(() => {
         
         // if we set autoShow to false, then we will need to call the show method here
         this.admobFree.interstitial.show();
         console.log("Display")
       })
    }
      
      
    }

    showBanner()
    {
      if(this.platform.is('cordova'))
      {
 
      const bannerConfig: AdMobFreeBannerConfig = {
        // add your config here
        // for the sake of this example we will just use the test config

        isTesting: true,
        autoShow: true,
        id:"ca-app-pub-6794621608321846/8839635866"
       };
       this.admobFree.banner.config(bannerConfig);
       
       this.admobFree.banner.prepare()
         .then(() => {
           // banner Ad is ready
           // if we set autoShow to false, then we will need to call the show method here
         })
         .catch(e => console.log(e));
    }
  
    }
  
}


