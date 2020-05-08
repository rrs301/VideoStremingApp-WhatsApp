import { Component, OnInit } from '@angular/core';
import { AppAPIService } from '../app-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  MainCategoryData:any=[];
  cat_row=[];
  loop=[0,1];

  constructor(private api:AppAPIService,private route:Router) {}
  ngOnInit(): void {
   this.getCategory();
  }


  getCategory()
  {
    this.api.getCategory().subscribe(data=>{
      
      this.MainCategoryData=data;
      console.log(this.MainCategoryData);
      let tempData=this.MainCategoryData.length/2;
     
      let flag=0;
      for(let i=0;i<Math.ceil(tempData);i++)
      {

          this.cat_row.push(flag);
          flag+=2;
      }
      console.log(this.cat_row);
     
      //this.cat_row.push(this.MainCategoryData/3)
    });
  }
}
