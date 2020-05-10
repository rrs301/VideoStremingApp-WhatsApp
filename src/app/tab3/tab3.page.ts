import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { AppAPIService } from '../app-api.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  redeem=0;
  isLogin=0;
  email:any;
  constructor(private api:AppAPIService,private storage: Storage) {}
  ngOnInit(): void {
    // set a key/value
  

  // Or to get a key/value pair
  this.storage.get('email').then((val) => {
    console.log('Your age is', val);
    if(this.email)
    {
      this.isLogin=1;
    }

  });
  }

  ContactUs()
  {
    let Link="mailto:contact@playbox99.com?subject=Regarding Videobox App";
    window.open(Link, "_system");
  }
  HowToPlay()
  {
    window.open("http://androidapps-91fd1.web.app/howToPlay","_system");

  }
  AboutUs()
  {
    window.open("http://androidapps-91fd1.web.app/aboutUs","_system");
  }
  LoginBtnClick()
  {
    Swal.fire({
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/androidapps-91fd1.appspot.com/o/undraw_access_account_99n5.png?alt=media&token=beb9c26e-1a2e-4625-81eb-d93fa975fa9e',
  imageHeight: 200,
      title: 'Enter your Email',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (email)=>{
        this.email=email;
        Swal.fire({
          title: 'Login with this Number?',
          text: "You won't be able to Change number again!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Confirm it!'
        }).then((result) => {
          if (result.value) {
            console.log(email);
            this.storage.set("email", email);
            this.isLogin=1;
            this.api.saveUser(email,"12345").subscribe(data=>{

            });
            Swal.fire(
              'Submitted!',
              'Your are login successfully.',
              'success'
            )
          }
        })
      }
    })
  }

}
