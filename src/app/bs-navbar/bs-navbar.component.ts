import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
//import { AuthService } from "angular2-social-login";
import { AuthService } from "./../services/google-login.service";

import { Router } from '@angular/router';
import { SharedService } from '../shared-service.service';
import {IAppUser} from './../models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})

export class BsNavbarComponent implements OnInit, OnChanges, OnDestroy {

 

  user:IAppUser;
  username:string='[NAME]';
  isAdmin:boolean=false;
  
  sub: any;
  constructor(public _auth: AuthService,private router:Router,private _sharedService: SharedService) { 
    //this.username=localStorage.getItem('username');   

  }

  ngOnInit() {
    this._sharedService.changeEmitted$.subscribe(
      text => {

          console.log(text);
          this.user=text;
          this.username=this.user.email;
          this.isAdmin=this.user.isAdmin;
      });
  }

  logout() {

    this.sub = this._auth.logout().subscribe(
      (data) => {
        console.log(data);
        this.username='[NAME]' ;
        this.isAdmin=false;

        this.router.navigate(['/login']);
      }
    )
  }


  ngOnChanges() {
    this._sharedService.changeEmitted$.subscribe(
      text => {
        console.log(text);
        this.user = text;
        this.username=this.user.email;
        this.isAdmin=this.user.isAdmin;
      });
  }

  ngOnDestroy() {
    this.sub = null;
  }

  // fetchUserDetails () {
  //   var currentUser = this._auth.gauth.currentUser.get();
  //   var profile = currentUser.getBasicProfile();
  //   var idToken = currentUser.getAuthResponse().id_token;
  //   var accessToken = currentUser.getAuthResponse().access_token;
  //   return {
  //       token: accessToken,
  //       idToken: idToken,
  //       uid: profile.getId(),
  //       name: profile.getName(),
  //       email: profile.getEmail(),
  //       image: profile.getImageUrl(),
  //       provider: "google"
  //   };



}
