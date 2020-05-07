import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppAPIService {

  constructor(private http: HttpClient) { }

  getCategory()
  {
    return this.http.get("https://playbox99.com/VideoApp/GetVideoCategory.php");
  }

  getRandomVideo()
  {
    return this.http.get("http://playbox99.com/VideoApp/GetVideoByCategory.php");
  }

}
