import { Component, OnInit } from '@angular/core';
import { AppAPIService } from 'src/app/app-api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  category:any=[];
  constructor(public api:AppAPIService) { }

  ngOnInit() {
    this.getCategory();
  }

  getCategory()
  {
      this.api.getCategory().subscribe(data=>{
        console.log(data);
        this.category=data;
      })
  }

}
