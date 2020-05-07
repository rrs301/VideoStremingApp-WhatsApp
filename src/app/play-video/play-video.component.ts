import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-play-video',
  templateUrl: './play-video.component.html',
  styleUrls: ['./play-video.component.scss'],
})
export class PlayVideoComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,) { }

  url:any;
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.url = params['url'];
      console.log(this.url);
    });
  }

}
