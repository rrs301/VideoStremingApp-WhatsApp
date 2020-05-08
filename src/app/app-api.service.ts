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
      'Preparing to Share'
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
      spinner:"dots"
    });
    await this.loading.present();

    
  }
  dismissLoading()
  {
    this.loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  

}
