import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppAPIService } from '../app-api.service';

@Component({
  selector: 'app-play-video',
  templateUrl: './play-video.component.html',
  styleUrls: ['./play-video.component.scss'],
})
export class PlayVideoComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private api:AppAPIService,private router:Router) { }

  url:any;
  title:string;
  categoryVideosList:any=[];
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
       this.api.getRandomVideo().subscribe(data=>{
         this.categoryVideosList=data;
         console.log(data);
       })
   }

   playVideo(url:string,title:string)
   {
     this.url=url;
     this.title=title;
   }
 
}
