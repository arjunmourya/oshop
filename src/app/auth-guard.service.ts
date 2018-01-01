import { Injectable } from '@angular/core';
import {CanActivate,Router} from '@angular/router';
import {SharedService} from './shared-service.service';
import { AuthService } from "./services/google-login.service";
import 'rxjs/add/operator/map';

declare const gapi: any;


@Injectable()
export class AuthGuard implements CanActivate {
  text:any;
  user:any;
  public auth2: any;
  constructor(private _auth: AuthService,private _sharedService: SharedService,private router:Router) { }

  canActivate(){ 
   this.googleInit();
   let currentUser = gapi.auth2.getAuthInstance().currentUser.get();
      let profile = currentUser.getBasicProfile();
      let idToken = currentUser.getAuthResponse().id_token;
      let accessToken = currentUser.getAuthResponse().access_token;
      console.log(
      {
        token: accessToken,
        idToken: idToken,
        uid: profile.getId(),
        name: profile.getName(),
        email: profile.getEmail(),
        image: profile.getImageUrl(),
        provider: "google"      
      });
   if(gapi.auth2.getAuthInstance().isSignedIn.get())return true;  
  // this.user=this._auth.fetchGoogleUserDetails()
  //  if(this.user && this.user.status)return true;

   this.router.navigate(['/login']);
    return false;
  }

  googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: "783541848322-fejsuieen9b8n5c9otcdlo7anllbk32o.apps.googleusercontent.com",        
        scope: "email"
      });      
    });
  }

}
