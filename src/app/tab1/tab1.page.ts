import { Component, OnInit, ViewChild } from '@angular/core';
import { AppAPIService } from '../app-api.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild(IonInfiniteScroll,{static: true}) infiniteScroll: IonInfiniteScroll;
  list:any=[];
  randomVideosList:any=[];

  dataCount=0;
  constructor(private api:AppAPIService,private router:Router) {}

  ngOnInit(): void {
   this.getRandomVideo();
  }

  getRandomVideo()
  {
      this.api.getRandomVideo(this.dataCount).subscribe(data=>{
       // this.randomVideosList=data;
        this.list=data;
        for(let i=0;i<this.list.length;i++)
        {
            this.randomVideosList.push(this.list[i]);
        }
      })
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
      this.getRandomVideo();
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

}
