import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  user:any;
  userFromDb:any;
  constructor(private userService:UserService) {
    let id='114600392585199924923';
    this.user = {
      email
      :
      "arjunmourya88@gmail.com",
      idToken
      :
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhiNmFkYjBjYWNmZmYyZTg2OTllNTIxNWZlZjA5YzBlODc2M2I1MmUifQ.eyJhenAiOiI3ODM1NDE4NDgzMjItZmVqc3VpZWVuOWI4bjVjOW90Y2RsbzdhbmxsYmszMm8uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3ODM1NDE4NDgzMjItZmVqc3VpZWVuOWI4bjVjOW90Y2RsbzdhbmxsYmszMm8uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTQ2MDAzOTI1ODUxOTk5MjQ5MjMiLCJlbWFpbCI6ImFyanVubW91cnlhODhAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJyMUR6QzFPR3ZaUGthbjBGM0VrMlJ3IiwiaXNzIjoiYWNjb3VudHMuZ29vZ2xlLmNvbSIsImp0aSI6IjZmNzVjYzA4YmM4ODIyMWIxYjRjOTIzYWNkZWMxZjFmMTdiZWEyMDYiLCJpYXQiOjE1MTQ4OTgyNDQsImV4cCI6MTUxNDkwMTg0NCwibmFtZSI6IkFyanVuIE1vdXJ5YSIsInBpY3R1cmUiOiJodHRwczovL2xoNC5nb29nbGV1c2VyY29udGVudC5jb20vLTUyc3VId2g4VmNvL0FBQUFBQUFBQUFJL0FBQUFBQUFBQURJL2o5OExGczNsLWNNL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJBcmp1biIsImZhbWlseV9uYW1lIjoiTW91cnlhIiwibG9jYWxlIjoiZW4ifQ.Gwg9ZKJ1rHOdkt3LIR8Q-PcqUslqPK775mTbdoKkUV4ecsaUskzL0abFJwLivf9DEtcVs9XB3P89lfBvlpsdkQi7NnoKVUN87Mc4aZKvvPbByU8Mus9RYqODYj1U_yBu_GuCGuIxvVHA3XsocKUMo-KA-OtQbUqvQ2_bBF92uGjJFb0gnPWkqQqmODAPbasDDVOiTWIhkbmagEVJynMdCnAGNmrHwMdhvSJO3fR8NFPuLd_LxK_dJuX2u_xXhAbJ09mZxg3Gx5E36BODxHD-6ymmLKx_dsdO4s0L-2VvClk7sGrEwzu31e1yIqH2u-Yizqt9SBRWllHhAQsfweoMvg",
      image
      :
      "https://lh4.googleusercontent.com/-52suHwh8Vco/AAAAAAAAAAI/AAAAAAAAADI/j98LFs3l-cM/s96-c/photo.jpg",
      name
      :
      "Arjun Mourya",
      provider
      :
      "google",
      status
      :
      true,
      token
      :
      "ya29.Gls2BTVdqXdx8OtpSvOmxZSp5AmzABC-PtbSZVkp4z1ajQ8FRo-GmOPtXKlXbpvgjL7AMd60WmqVjxu_DchzPVRJKCJ-jEQArj2tSGRKW8ps5x8fOuD7Z5UKnS3R",
      uid
      :
      "114600392585199924923"
    };
    //this.userService.saveUser(this.user).subscribe(userFromDb=>{console.log(userFromDb);this.userFromDb=userFromDb;},error=>console.log(error));
    //this.userService.getUser(id).subscribe(data=>this.user=data);
   }

  ngOnInit() {
  }

}
