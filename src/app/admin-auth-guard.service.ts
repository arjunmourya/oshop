import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/Observable/of';
import {UserService} from './user.service';
import {IAppUser} from './models/app-user';
import { Observable } from 'rxjs/Observable';
import { SharedService } from "./shared-service.service";

declare const gapi: any;

@Injectable()
export class AdminAuthGuard implements CanActivate{
  
  user: IAppUser;
  users:string[];
  public auth2: any;
  constructor(private userService:UserService,private _sharedService:SharedService) { }

  canActivate():boolean| Observable<boolean>{
    this.googleInit();
    this._sharedService.changeEmitted$.subscribe(
      text => {

          //console.log(text);
          this.user=text;
          
      });
    //this.user=this._sharedService.loggedUser.getValue();
    if (gapi.auth2 && gapi.auth2.getAuthInstance().isSignedIn.get()) {
      let currentUser = gapi.auth2.getAuthInstance().currentUser.get();
      let profile = currentUser.getBasicProfile();
      let uid=profile.getId();
      //this.userService.getUser(uid).subscribe((data=> this.user=data),error=>console.log(error));
      // if(this.user && this.user.isAdmin)
      // return true;     
      return this.userService.isAdminUser(uid);
    }
    else if(this.user){
      return this.userService.isAdminUser(this.user.userid);
    }
    else if(localStorage.getItem('userid')!=''){
      return this.userService.isAdminUser(localStorage.getItem('userid'));
    }
    return Observable.of(false);
  }
  
  googleInit() {
    // let that = this;
    // gapi.load('auth2', function () {
    //   that.auth2 = gapi.auth2.init({
    //     client_id: "783541848322-fejsuieen9b8n5c9otcdlo7anllbk32o.apps.googleusercontent.com",
    //     scope: "email"
    //   });
    // });

    gapi.load('auth2', function() {
                        gapi.auth2.init({
                        client_id: "783541848322-fejsuieen9b8n5c9otcdlo7anllbk32o.apps.googleusercontent.com",
                        scope: 'email'
                        })
                    })
  }
}
