import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppAPIService } from '../app-api.service';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-play-video',
  templateUrl: './play-video.component.html',
  styleUrls: ['./play-video.component.scss'],
})
export class PlayVideoComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private socialSharing: SocialSharing, public platform   : Platform,
    private api:AppAPIService,private router:Router,private downloader:Downloader) { }

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
          .then((location: string) => console.log('File downloaded at:'+location))
          .catch((error: any) => console.error(error));

          this.api.showMsgDialog();
   }

   shareBtn()
   {
      this.platform.ready()
      .then(() => 
      {		  		

         this.socialSharing.share(this.title, "\nDownload the VideoBox App from Playstore\n", "", this.url)
         .then((data) =>
         {
            console.log('Shared via SharePicker');
         })
         .catch((err) =>
         {
            console.log('Was not shared via SharePicker');
         });

      });
   }

 
}


