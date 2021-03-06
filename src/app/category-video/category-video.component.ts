import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppAPIService } from '../app-api.service';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Platform, IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-category-video',
  templateUrl: './category-video.component.html',
  styleUrls: ['./category-video.component.scss'],
})
export class CategoryVideoComponent implements OnInit {
  @ViewChild(IonInfiniteScroll,{static: true}) infiniteScroll: IonInfiniteScroll;
  list:any=[];
  randomVideosList:any=[];
  isplayVideo=0;
  dataCount=0;
  viewMode=1;
  category;
  img="https://cambridgewords.files.wordpress.com/2019/11/funny.jpg";
  constructor(private activatedRoute: ActivatedRoute,private socialSharing: SocialSharing, public platform   : Platform,
    private api:AppAPIService,private router:Router,private downloader:Downloader) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.category = params['category'];
      console.log(this.category);
    });
   this.getCategoryVideo();
  }

  getCategoryVideo()
  {
    this.api.presentLoading();
      this.api.getCategoryVideo(this.dataCount,this.category).subscribe(data=>{
       // this.randomVideosList=data;
        this.list=data;
        console.log(this.list);
        for(let i=0;i<this.list.length;i++)
        {
            this.randomVideosList.push(this.list[i]);
        }
        this.api.dismissLoading();
      })
  }

  changeViewMode()
  {
    if(this.viewMode==1)
    {
      this.viewMode=2;
    }
    else{
      this.viewMode=1;
    }
  }
  inPagePlayVideo()
  {
      this.isplayVideo=1;
  }
  playVideo(url:string,title:string)
  {
      console.log(url);
      this.router.navigate(['playVideo'], {
      queryParams:
      {
        url:url,
        title:title
      }
    }
      );
  }
  loadData(event) {
    setTimeout(() => {
      this.dataCount+=25;
      this.getCategoryVideo();
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.randomVideosList.length == 1000) {
        event.target.disabled = true;
      }
    }, 1500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }


  DownloadVideo(url:string,title:string)
  {
   
   let request: DownloadRequest = {
     uri: url,
     title: title,
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
        this.api.SaveUserDownloadStatics();
         this.api.showMsgDialog("Download Started");
  }

  shareBtn(url:string,title:string)
  {
    //this.api.showLoader();
    this.api.presentLoading();
     this.platform.ready()
     .then(() => 
     {		  		

        this.socialSharing.share(title, "\nDownload the VideoBox App from Playstore\n", url, url)
        .then((data) =>
        {
           console.log('Shared via SharePicker');
    //       this.api.dismissLoader();
           this.api.dismissLoading();
           this.api.SaveUserShareStatics();
        })
        .catch((err) =>
        {
           console.log('Was not shared via SharePicker');
        });

     });
  }
  


}
