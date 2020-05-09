import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AppAPIService {
   loading;
   
  constructor(private http: HttpClient,public loadingController: LoadingController) { }

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
  

}
