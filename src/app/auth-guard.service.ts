import { Injectable } from '@angular/core';
import { CanActivate, Router ,RouterStateSnapshot,ActivatedRouteSnapshot} from '@angular/router';
import 'rxjs/add/operator/map';
import { SharedService } from "./shared-service.service";
import { AuthService } from "./services/google-login.service";
import {UserService} from './user.service';
import { Observable } from 'rxjs/Observable';

declare const gapi: any;


@Injectable()
export class AuthGuard implements CanActivate {
  text: any;
  user: any;
  public auth2: any;
  constructor( private router: Router,private _sharedService:SharedService,public _auth: AuthService,private userService:UserService) {
     this.googleInit();     
   }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
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
      let idToken = currentUser.getAuthResponse().id_token;
      let accessToken = currentUser.getAuthResponse().access_token;
      // console.log(
      //   {
      //     token: accessToken,
      //     idToken: idToken,
      //     uid: profile.getId(),
      //     name: profile.getName(),
      //     email: profile.getEmail(),
      //     image: profile.getImageUrl(),
      //     provider: "google"
      //   });
        //this.router.navigateByUrl(state.url);
      return true;
    }
    else if(this.user){
      return true;
    }
    else if(localStorage.getItem('userid')!=''){
      this.userService.getUser(localStorage.getItem('userid')).subscribe(data=>{
        this.user=data;
        this._sharedService.emitChange(data);
      }
        ,error=>Observable.throw(error));
      
      return true;
    }
    

    this.router.navigate(['/login']);
    return false;
  }

  googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      gapi.auth2.init({
        client_id: "783541848322-fejsuieen9b8n5c9otcdlo7anllbk32o.apps.googleusercontent.com",
        scope: "email"
      });
    });
  }

}
