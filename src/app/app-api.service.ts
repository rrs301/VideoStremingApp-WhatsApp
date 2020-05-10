import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AppAPIService {
   loading;
   VideoCount;
   ShareCount;
   DownloadCount;
  constructor(private http: HttpClient,
    private storage:Storage,
    public loadingController: LoadingController) { }

  getCategory()
  {
    return this.http.get("https://playbox99.com/VideoApp/GetVideoCategory.php?");
  }

  getRandomVideo(dataCount:number,)
  {
    console.log('https://playbox99.com/VideoApp/GetVideoByCategory.php?dataCount='+dataCount);
    return this.http.get("https://playbox99.com/VideoApp/GetVideoByCategory.php?dataCount="+dataCount);
  }
  getCategoryVideo(dataCount:number,cat:string='')
  {
    console.log('https://playbox99.com/VideoApp/GetVideoByCategory.php?dataCount='+dataCount+"&cat="+cat);
    return this.http.get("https://playbox99.com/VideoApp/GetVideoByCategory.php?dataCount="+dataCount+"&cat="+cat);
  }
  saveUser(email:number,pid:string)
  {
    console.log("https://playbox99.com/VideoApp/saveUser.php?email="+email+"&pid="+pid);
    return this.http.get("https://playbox99.com/VideoApp/saveUser.php?email="+email+"&pid="+pid);
  }
  showMsgDialog(msg:string)
  {
    Swal.fire(
       msg,
      'Downloading Started Now',
      'success'
    )
  }

  showLoader()
  {
    Swal.fire(
      'Please Wait',
      'We are getting New things'
    )
    Swal.showLoading();
  
  }
  dismissLoader()
  {
    Swal.close();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      backdropDismiss:true,
      spinner:"dots",
      duration: 2000
    });
    await this.loading.present();

    
  }
  async dismissLoading()
  {
    this.loading.dismiss();
    console.log('Loading dismissed!');
  }
  
  SaveUserVideoStatics()
  {
  // Or to get a key/value pair
  this.storage.get('videoCount').then((val) => {
   
    val=val+1;
    console.log('Your videoCount is', val);
    this.storage.set('videoCount', val);
    this.VideoCount=val;
  });
  }
  SaveUserDownloadStatics()
  {
  // Or to get a key/value pair
  this.storage.get('downloadCount').then((val) => {
    console.log('Your downloadCount is', val);
    val=val+1;
    this.storage.set('downloadCount', val++);
    this.DownloadCount=val;
  });
  }
  SaveUserShareStatics()
  {
  // Or to get a key/value pair
  this.storage.get('shareCount').then((val) => {
    console.log('Your shareCount is', val);
    val=val+1;
    this.storage.set('shareCount', val++);
    this.ShareCount=val;
  });
  }

  UploadStatics()
  {
    if(this.VideoCount>5&&this.ShareCount==5&&this.DownloadCount==5)
    {
      console.log("Upload Data");
      this.showMsgDialog("Successfully Completed Todays Task");
    }
  }
  ResetUserStatic()
  {
    let day=new Date().getDate();
    let month=new Date().getMonth()+1;
    let year=new Date().getFullYear();
    let today=day+"-"+month+'-'+year;
    console.log(today);
    this.storage.get('today').then((val) => {
      console.log('Your shareCount is', val);
      if(today!==val)
      {
        this.storage.clear();
        this.storage.set("today", today);
        
      }
      
    });
  }  
}
