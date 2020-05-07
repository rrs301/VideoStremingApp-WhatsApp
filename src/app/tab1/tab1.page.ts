import { Component, OnInit } from '@angular/core';
import { AppAPIService } from '../app-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
 

  randomVideosList:any=[];
  constructor(private api:AppAPIService,private router:Router) {}

  ngOnInit(): void {
   this.getRandomVideo();
  }

  getRandomVideo()
  {
      this.api.getRandomVideo().subscribe(data=>{
        this.randomVideosList=data;
        console.log(data);
      })
  }

  playVideo(url:string)
  {
      console.log(url);
      this.router.navigate(['playVideo'], {
      queryParams:
      {
        url:url
      }
    }
      );
  }

}
