import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class AppAPIService {

  constructor(private http: HttpClient) { }

  getCategory()
  {
    return this.http.get("https://playbox99.com/VideoApp/GetVideoCategory.php");
  }

  getRandomVideo(dataCount:number)
  {
    console.log('https://playbox99.com/VideoApp/GetVideoByCategory.php?dataCount='+dataCount);
    return this.http.get("https://playbox99.com/VideoApp/GetVideoByCategory.php?dataCount="+dataCount);
  }

  showMsgDialog()
  {
    Swal.fire(
      'Thank you for Downloading',
      'Downloading Started Now',
      'success'
    )
  }

}
