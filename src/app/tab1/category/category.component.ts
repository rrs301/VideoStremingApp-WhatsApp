import { Component, OnInit } from '@angular/core';
import { AppAPIService } from 'src/app/app-api.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  category:any=[];
  constructor(public api:AppAPIService,private route:Router) { }

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
  CategoryClick(category:string)
  {
      //this.api.getRandomVideo()
      this.route.navigate(['CategoryVideo'], {
        queryParams:
        {
          category:category.toLowerCase()
        }
      })
  }

}
